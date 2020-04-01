import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';

import { ConfigService } from '../../shared/utils/config.service';

import { BaseService } from '../../shared/services/base.service';

import { Flight } from '../models/flight';

import { Observable, throwError } from 'rxjs';

import { tap, map, catchError } from 'rxjs/operators';
import { getDateString } from '../utils/util';
import { FilterSettings } from '../models/filterSettings';
import { HttpHeaders } from '@angular/common/http';



@Injectable()

export class FlightService extends BaseService {

  baseUrl: string = '';

  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
  }

  getUrl(settings: FilterSettings, local: string): string {
   // let dateFromStr = getDateString(settings.dateFrom);
    //let dateToStr = getDateString(settings.dateTo);
    let url = this.baseUrl + `${local}`;//?dateFrom=${dateFromStr}&dateTo=${dateToStr}`;
    //if (settings.operatorId && settings.operatorId > 0) {
    //  url = url + `&operatorId=${settings.operatorId}`
    //}
    //if (settings.flightNo) {
    //  url = url + `&flightNo=${settings.flightNo}`
    //}
    //if (settings.airCompany) {
    //  url = url + `&airCompany=${settings.airCompany}`
    //}
    //if (settings.departureCity) {
    //  url = url + `&departureCity=${settings.departureCity}`
    //}
    //if (settings.departureAirport) {
    //  url = url + `&departureAirport=${settings.departureAirport}`
    //}
    //if (settings.destinationAirport) {
    //  url = url + `&destinationAirport=${settings.destinationAirport}`
    //}
    //if (settings.aircraftKind) {
    //  url = url + `&aircraftKind=${settings.aircraftKind}`
    //}
    return url;
  }

  saveFlights(settings: FilterSettings) {
    let headers = this.getHeaders();
    let url = this.getUrl(settings, "/info/saveFlights");
    settings = this.adjustDates(settings);
    return this.http.post(url, settings, { headers: headers, responseType: ResponseContentType.Blob})
       .pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.error(error)
        )
      );

  }

  getDictionaries() {
    let headers = this.getHeaders();
    let url = `${this.baseUrl}/info/dictionaries`;
    return this.http.get(url, { headers })
      .pipe(map((response: Response) => {
        return response.json();
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  adjustDates(settings: FilterSettings): FilterSettings {
    settings.dateFrom= getDateString(settings.dateFrom);
    settings.dateTo = getDateString(settings.dateTo);
    return settings;
  }


  getFlights(settings: FilterSettings): Observable<Flight[]> {
    let headers = this.getHeaders();

    let url = this.getUrl(settings, "/info/flights");
    settings = this.adjustDates(settings);
    return this.http.post(url, settings, { headers })
      .pipe(map((response: Response) => {
        return response.json().flights;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    return headers;
  }

  private getOptions() {
    let authToken = localStorage.getItem('auth_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authToken
      })
    };
    return httpOptions;
  }
}
