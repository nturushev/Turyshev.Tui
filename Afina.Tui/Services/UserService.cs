//using Afina.Tui.Models;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.Extensions.Logging;
//using Microsoft.IdentityModel.Tokens;
//using System;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;
//using Microsoft.Extensions.Configuration;

//namespace Afina.Tui.Services
//{
//	public class UserService
//	{
//		private readonly ILogger _logger;

//		private readonly SignInManager<ApplicationUser> _signInManager;
//		private readonly UserManager<ApplicationUser> _userManager;
//		private readonly IConfiguration _configuration;
//		private readonly string Secret;

//		public UserService(IConfiguration configuration,
//			SignInManager<ApplicationUser> signInManager,
//			UserManager<ApplicationUser> userManager,
//			ILogger logger)
//		{
//			_configuration = configuration;
//			_signInManager = signInManager;
//			_userManager = userManager;
//			_logger = logger;
//			Secret = _configuration["Settings:Secret"];
//		}

//		public async Task<ApplicationUser> Authenticate(string username, string password)
//		{
//			var user = await _userManager.FindByEmailAsync(username);
//			var result = await _signInManager.PasswordSignInAsync(username, password, false, lockoutOnFailure: false);

//			// return null if user not found
//			if (user == null)
//				return null;

//			// authentication successful so generate jwt token
//			var tokenHandler = new JwtSecurityTokenHandler();
//			var key = Encoding.ASCII.GetBytes(Secret);
//			var tokenDescriptor = new SecurityTokenDescriptor
//			{
//				Subject = new ClaimsIdentity(new Claim[]
//				{
//					new Claim(ClaimTypes.Name, user.Id.ToString())
//				}),
//				Expires = DateTime.UtcNow.AddDays(7),
//				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//			};
//			//var token = tokenHandler.CreateToken(tokenDescriptor);
//			//!!user.Token = tokenHandler.WriteToken(token);
//			return user;
//		}
//		public string GenerateEncodedToken(string userName, ClaimsIdentity identity)
//		{
//			var tokenHandler = new JwtSecurityTokenHandler();
//			var key = Encoding.ASCII.GetBytes(Secret);
//			var tokenDescriptor = new SecurityTokenDescriptor
//			{
//				Subject = new ClaimsIdentity(new Claim[]
//				{
//					new Claim(ClaimTypes.Name, userName.ToString())
//				}),
//				Expires = DateTime.UtcNow.AddDays(7),
//				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//			};
//			var token = tokenHandler.CreateToken(tokenDescriptor);
//			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(token);

//			return encodedJwt;
//		}

//		//	public async Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity)
//		//	{
//		//		var claims = new[]
//		//		{
//		//  new Claim(JwtRegisteredClaimNames.Sub, userName),
//		//  new Claim(JwtRegisteredClaimNames.Jti, await _jwtOptions.JtiGenerator()),
//		//  new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64), 
//		//identity.FindFirst(Helpers.Constants.Strings.JwtClaimIdentifiers.Rol),
//		//  identity.FindFirst(Helpers.Constants.Strings.JwtClaimIdentifiers.Id)
//		//  };

//		//		// Create the JWT security token and encode it.
//		//		var jwt = new JwtSecurityToken(
//		//			issuer: _jwtOptions.Issuer,
//		//			audience: _jwtOptions.Audience,
//		//			claims: claims,
//		//			notBefore: _jwtOptions.NotBefore,
//		//			expires: _jwtOptions.Expiration,
//		//			signingCredentials: _jwtOptions.SigningCredentials);

//		//		var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

//		//		return encodedJwt;
//		//	}
//	}
//}
