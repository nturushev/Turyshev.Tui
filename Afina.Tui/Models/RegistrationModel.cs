﻿using FluentValidation.Attributes;

namespace Afina.Tui.Controllers
{
	[Validator(typeof(RegistrationModelValidator))]
	public class RegistrationModel
	{
		public string Email { get; set; }
		public string Password { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
	}
}