using FluentValidation.Attributes;

namespace Afina.Tui.Controllers
{
	[Validator(typeof(CredentialsModelValidator))]
	public class CredentialsModel
	{
		public string UserName { get; set; }
		public string Password { get; set; }
	}
}