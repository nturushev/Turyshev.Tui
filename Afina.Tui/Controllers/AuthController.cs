using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Afina.Tui.Models;
using Afina.Tui.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Afina.Tui.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly IJwtFactory _jwtFactory;
		private readonly JsonSerializerSettings _serializerSettings;
		private readonly JwtIssuerOptions _jwtOptions;
		private readonly ILogger<AuthController> _logger;

		public AuthController(UserManager<ApplicationUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions,
			ILogger<AuthController> logger)
		{
			_userManager = userManager;
			_jwtFactory = jwtFactory;
			_jwtOptions = jwtOptions.Value;
			_logger = logger;

			_serializerSettings = new JsonSerializerSettings
			{
				Formatting = Formatting.Indented
			};
		}

		// POST api/auth/login
		[HttpPost("login")]
		public async Task<IActionResult> Post([FromBody]CredentialsModel credentials)
		{
			try
			{
				_logger.LogInformation($"{credentials.UserName}, {credentials.Password}, {ModelState.IsValid}");
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
				if (identity == null)
				{
					_logger.LogInformation($"identity == null");
					return BadRequest("login_failure");
				}

				// Serialize and return the response
				var response = new
				{
					id = identity.Claims.Single(c => c.Type == "id").Value,
					auth_token = await _jwtFactory.GenerateEncodedToken(credentials.UserName, identity),
					expires_in = (int)_jwtOptions.ValidFor.TotalSeconds
				};

				var json = JsonConvert.SerializeObject(response, _serializerSettings);
				return new OkObjectResult(json);
			}
			catch (Exception ex) {
				_logger.LogError(ex,"");
				return BadRequest();
			}
		}

		private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
		{
			if (!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(password))
			{
				// get the user to verifty
				var userToVerify = await _userManager.FindByNameAsync(userName);

				if (userToVerify != null)
				{
					// check the credentials  
					if (await _userManager.CheckPasswordAsync(userToVerify, password))
					{
						return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
					}
				}
			}

			// Credentials are invalid, or account doesn't exist
			return await Task.FromResult<ClaimsIdentity>(null);
		}
	}
}