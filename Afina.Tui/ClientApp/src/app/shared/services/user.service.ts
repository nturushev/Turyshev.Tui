import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

//import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import { BaseService } from "./base.service";

import { Observable, BehaviorSubject, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class UserService extends BaseService implements CanActivate {

  baseUrl: string = '';

  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: Http, private configService: ConfigService, private router: Router) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

  //register(email: string, password: string, firstName: string, lastName: string, location: string): Observable<UserRegistration> {
  //  let body = JSON.stringify({ email, password, firstName, lastName, location });
  //  let headers = new Headers({ 'Content-Type': 'application/json' });
  //  let options = new RequestOptions({ headers: headers });

  //  return this.http.post(this.baseUrl + "/accounts", body, options)
  //    .map(res => true)
  //    .catch(this.handleError);
  //}

  login(userName, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        this.baseUrl + '/auth/login',
        JSON.stringify({ userName, password }), { headers }
      ).pipe(
        // map(res => res.json()),
        map((res: any) => {
          let token = JSON.parse(res._body).auth_token;
          localStorage.setItem('auth_token', token);
          this.loggedIn = true;
          this._authNavStatusSource.next(true);
          return true;
        }), catchError((err: any, caught: Observable<any>) => {
          console.log(err);
          return throwError(this.generalErrorHandler(err, caught))
        }));
  }


  generalErrorHandler(error: any, caught: Observable<any>): Observable<any> {
    console.log('error caught: ', error);
    if (error.status == "INVALID_TOKEN" || error.status == "MAX_TOKEN_ISSUE_REACHED") {
      console.log('token has expired');
      this.logout();
      return error;
    }
    return error;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  canActivate(): boolean {
    const isAuth = this.isLoggedIn();
    if (!isAuth) {
      //if not authenticated do something. e.g redirect to login  page
      this.router.navigate(['', '/'])
    }
    return isAuth;
  }
}
