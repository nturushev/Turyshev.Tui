using System.Threading.Tasks;
using Afina.Tui.Data;
using Afina.Tui.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.Extensions.Logging;
using System;

namespace Afina.Tui.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AccountController : ControllerBase
	{
		protected readonly ILogger<AccountController> _logger;

		private readonly ApplicationDbContext _appDbContext;
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly IMapper _mapper;

		public AccountController(UserManager<ApplicationUser> userManager, ApplicationDbContext appDbContext,
				ILogger<AccountController> logger
			)
		{
			_userManager = userManager;
			_appDbContext = appDbContext;
			_logger = logger;
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody]RegistrationModel model)
		{
			_logger.LogInformation($"{model.Email}, {model.Password}, {model.FirstName}, {model.LastName}, {ModelState.IsValid}");
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var userIdentity = new ApplicationUser
			{
				UserName = model.Email,
				Email = model.Email,
				FirstName = model.FirstName,
				LastName = model.LastName
			};
			try
			{
				var result = await _userManager.CreateAsync(userIdentity, model.Password);

				if (!result.Succeeded)
				{
					var errors = string.Join(',', result.Errors.Select(err => err.Description));
					_logger.LogError(errors);
					//return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
					return BadRequest();

				}
				await _appDbContext.SaveChangesAsync();

				return new OkResult();
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "");
				return BadRequest(ex.ToString());

			}
		}
	}
}