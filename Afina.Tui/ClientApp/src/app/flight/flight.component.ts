import { Component, OnInit, PipeTransform, Directive, Input, EventEmitter, Output, ViewChildren, QueryList }
  from '@angular/core';
import { FlightService } from '../shared/services/flight.service';
import { Flight } from '../shared/models/flight';
import { SortDirection, SortEvent, NgbdSortableHeader } from '../directives/sortable.directive';
import { debounceTime, delay, switchMap, tap, map, catchError } from 'rxjs/operators';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../shared/utils/dateformat';
import { getDateString } from '../shared/utils/util';
import { FilterSettings } from '../shared/models/filterSettings';
import { FormControl, NgControl } from '@angular/forms';
import { Operator } from '../shared/models/operator';


interface SearchResult {
  flights: Flight[];
  total: number;
}



function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(flights: Flight[], column: string, direction: string): Flight[] {
  if (direction === '') {
    return flights;
  } else {
    return [...flights].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}



@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class FlightComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  filteredAircompanies: any[];
  filteredDepartureAirports: any[];
  filteredDestinationAirports: any[];

  constructor(private flightService: FlightService) { }

  operators: Operator[];//= [new Operator(0, "----"), new Operator(1, "Pegas"), new Operator(2, "Anex"), new Operator(3, "Biblio")];
  airCompanies: any[];
  departureAirports: any[];
  destinationAirports: any[];
  flights: Flight[];
  initialFlights: Flight[];


  dateFrom: object;
  dateTo: object;
  /// selectedOperator: Operator = this.operators.find(op => op.operatorId == 0);
  selectedOperatorId: number = 0;
  selectedFlightNo: string = "";
  selectedAirCompanies: string[];
  selectedDepartureCity: string = "";
  selectedDepartureAirports: string[];
  selectedDestinationAirports: string[];

  selectedAirCraftKind: string = "";
  isRequesting: boolean = false;

  ngOnInit() {
    let currentDate = new Date();
    this.dateFrom = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };

    let nextDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1))
    this.dateTo = { year: nextDate.getFullYear(), month: nextDate.getMonth() + 1, day: nextDate.getDate() };
    this.getDictionaries();
  }



  search(operatorId: number, pipe: PipeTransform): Flight[] {
    let flights = this.initialFlights;
    if (operatorId > 0) {
      flights = this.initialFlights.filter(flight => {
        // const term = text.toLowerCase();
        return flight.operatorId == operatorId
          //|| pipe.transform(country.area).includes(term)
          //|| pipe.transform(country.population).includes(term)
          ;
      });
    }
    return flights;
  }

  getSettings(): FilterSettings {
    let settings = new FilterSettings();
    settings.dateFrom = this.dateFrom;
    settings.dateTo = this.dateTo;
    settings.operatorId = this.selectedOperatorId;
    settings.flightNo = this.selectedFlightNo;
    settings.airCompanies = this.selectedAirCompanies;
    settings.departureCity = this.selectedDepartureCity;
    settings.departureAirports = this.selectedDepartureAirports;
    settings.destinationAirports = this.selectedDestinationAirports;
    settings.aircraftKind = this.selectedAirCraftKind;
    return settings;
  }

  saveFlights() {
    this.isRequesting = true;

    let settings = this.getSettings();
    this.flightService.saveFlights(settings)
      .subscribe((results: any) => {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(results._body);
        let dateFromStr = getDateString(this.dateFrom);
        let dateToStr = getDateString(this.dateTo);
        a.download = `Отчет с ${dateFromStr} по ${dateToStr}.xlsx`;
        // start download
        a.click();
        this.isRequesting = false;
      },
        //this.downloadFile(results._body),
        error => {
          this.isRequesting = false;
          console.log("Error downloading the file.");
        },
        () => { this.isRequesting = false; console.log('Completed file download.'); });
  }

  changeOperatorId(event) {
    this.filteredAircompanies = this.airCompanies.filter(airC => airC.operatorID == this.selectedOperatorId);//.map(airC => airC.name);

    this.filteredDepartureAirports = this.departureAirports.filter(airC => airC.operatorID == this.selectedOperatorId);//.map(airC => airC.name);

    this.filteredDestinationAirports = this.destinationAirports.filter(airC => airC.operatorID == this.selectedOperatorId);//.map(airC => airC.name);
  }

  getFlights() {
    this.isRequesting = true;
    let settings = this.getSettings();
    this.flightService.getFlights(settings)
      .subscribe((response: Flight[]) => {
        if (response) {
          let localFlights = response.map(flight =>
            new Flight(flight));
          this.flights = localFlights; // JSON.parse(response._body).flights;
          this.initialFlights = this.flights;
        }
        else {
          console.log(response);
        }
        this.isRequesting = false;
      }, error => { console.log(error); this.isRequesting = false; });
  }

  getDictionaries() {
    this.isRequesting = true;
    this.flightService.getDictionaries()
      .subscribe(response => {
        if (response) {
          this.operators = response.operators; // JSON.parse(response._body).flights;
          this.airCompanies = response.airCompanies;
          this.departureAirports = response.departureAirports;
          this.destinationAirports = response.destinationAirports;
        }
        else {
          console.log(response);
        }
        this.isRequesting = false;
      }, error => { console.log(error); this.isRequesting = false; });
  }



  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (this.flights) {
      // sorting countries
      if (direction === '') {
        this.flights = this.initialFlights;
      } else {
        this.flights = [...this.flights].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
      }
    }
  }
}
