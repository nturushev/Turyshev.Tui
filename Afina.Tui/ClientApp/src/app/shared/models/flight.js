"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Flight = /** @class */ (function () {
    function Flight(flight) {
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
    Flight.prototype.time = function () {
        return this.departureTime + " -> " + this.destinationTime;
    };
    return Flight;
}());
exports.Flight = Flight;
//# sourceMappingURL=flight.js.map