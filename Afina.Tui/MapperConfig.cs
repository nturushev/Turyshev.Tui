using Afina.Tui.Controllers;
using Afina.Tui.Models;
using AutoMapper;

namespace Afina.Tui
{
	public class MapperConfig
	{
		public static void Initialize()
		{
			Mapper.Initialize(cfg =>
			{
				cfg.CreateMap<RegistrationModel, ApplicationUser>()
					.ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email))
					.ReverseMap();
			});
		}
	}
}
