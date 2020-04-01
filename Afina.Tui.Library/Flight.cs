using System;

namespace Afina.Tui.Library
{
	public class Flight
	{
		public DateTime DepartureDate { get; set; }
		public string DepartureTime { get; set; }

		public DateTime DestinationDate { get; set; }
		public string DestinationTime { get; set; }
		public string OperatorName { get; set; }
		public string FlightNo { get; set; }
		public string FlightCompanyName { get; set; }
		public string DepartureCity { get; set; }
		public string DepartureCityCode { get; set; }
		public string DepartureAirportCode { get; set; }
		public string DestinationAirportCode { get; set; }
		public string AircraftKind { get; set; }
		public bool IsConnecting{ get; set; }
		public int? OperatorId { get; set; }
		public string DestinationCity { get; set; }
		public DateTime? CollectDate { get; set; }
	}
}
