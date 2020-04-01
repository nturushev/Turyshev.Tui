using FluentValidation;

namespace Afina.Tui.Controllers
{
	public class RegistrationModelValidator : AbstractValidator<RegistrationModel>
	{
		public RegistrationModelValidator()
		{
			RuleFor(vm => vm.Email).NotEmpty().WithMessage("Email cannot be empty");
			RuleFor(vm => vm.Password).NotEmpty().WithMessage("Password cannot be empty");
			RuleFor(vm => vm.FirstName).NotEmpty().WithMessage("FirstName cannot be empty");
			RuleFor(vm => vm.LastName).NotEmpty().WithMessage("LastName cannot be empty");
		//	RuleFor(vm => vm.Location).NotEmpty().WithMessage("Location cannot be empty");
		}
	}
}