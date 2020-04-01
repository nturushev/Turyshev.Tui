using System;

namespace Afina.Tui.Data
{
	public class Flight
	{
		public long FlightId { get; set; }
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
		public string DestinationAirportCodeWithConnecting  => DestinationAirportCode + (IsConnecting ? "(стыковка)" : "");
		public string AircraftKind { get; set; }
		public bool IsConnecting { get; set; }
		public DateTime? CollectDate { get;  set; }
		public int? OperatorId { get;  set; }
		public string DestinationCity { get; set; }

		public Flight() { }
		public Flight(Library.Flight dto)
		{
			DepartureDate = dto.DepartureDate;
			DepartureTime = dto.DepartureTime;
			DestinationDate = dto.DestinationDate;
			DestinationTime = dto.DestinationTime;
			OperatorName = dto.OperatorName;
			FlightNo = dto.FlightNo;
			FlightCompanyName = dto.FlightCompanyName;
			DepartureCity = dto.DepartureCity;
			DepartureCityCode = dto.DepartureCityCode;
			DepartureAirportCode = dto.DepartureAirportCode;
			DestinationAirportCode = dto.DestinationAirportCode;
			AircraftKind = dto.AircraftKind;
			IsConnecting = dto.IsConnecting;
			CollectDate = dto.CollectDate;
			OperatorId =  dto.OperatorId;
			DestinationCity = dto.DestinationCity;
		}
	}
}