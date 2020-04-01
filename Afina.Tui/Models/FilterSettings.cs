using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Afina.Tui.Models
{
	public class FilterSettings
	{
		public string DateFrom { get; set; }
		public string DateTo { get; set; }

		//[BindProperty(Name = "operatorId")]
		public int? OperatorId { get; set; }

		//[BindProperty(Name = "flightNo")]
		public string FlightNo { get; set; }

		//[BindProperty(Name = "airCompanies")]
		public List<string> AirCompanies { get; set; }

		//[BindProperty(Name = "DepartureCity")]
		public string DepartureCity { get; set; }
		//[BindProperty(Name = "departureAirports")]
		public List<string> DepartureAirports { get; set; }
		///[BindProperty(Name = "destinationAirports")]
		public List<string> DestinationAirports { get; set; }
		//[BindProperty(Name = "airCraftKind")]
		public string AirCraftKind { get; set; }
	}
}
