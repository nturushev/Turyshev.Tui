export class Flight {
  flightID: number;
  departureDate: Date;
  departureTime: string;
  destinationDate: Date;
  destinationTime: string;
  operatorName: string;
  flightNo: string;
  flightCompanyName: string;
  departureCity: string;
  departureCityCode: string;
  departureAirportCode: string;
  destinationAirportCode: string;
  destinationAirportCodeWithConnecting: string;
  aircraftKind: string;
  operatorId: number;

  time(): string {
    return `${this.departureTime} -> ${this.destinationTime}`;
  }

  constructor(flight: any) {
    this.flightID = flight.flightID;
    this.departureDate = flight.departureDate;
    this.departureTime = flight.departureTime;
    this.destinationDate = flight.destinationDate;
    this.destinationTime = flight.destinationTime;
    this.operatorName = flight.operatorName;
    this.flightNo = flight.flightNo;
    this.flightCompanyName = flight.flightCompanyName;
    this.departureCity = flight.departureCity;
    this.departureCityCode = flight.departureCityCode;
    this.departureAirportCode = flight.departureAirportCode;
    this.destinationAirportCode = flight.destinationAirportCode;
    this.destinationAirportCodeWithConnecting = flight.destinationAirportCodeWithConnecting;
    this.aircraftKind = flight.aircraftKind;
    this.operatorId = flight.operatorId;
  }
}
