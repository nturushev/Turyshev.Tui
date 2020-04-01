using Microsoft.AspNetCore.Identity;

namespace Afina.Tui.Models
{
	public class ApplicationUser : IdentityUser
	{
		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string FullName => $"{LastName} {FirstName}";
	}
}
