import { HttpErrorResponse } from '@angular/common/http';
import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

// sweet global way to handle 401s - works in tandem with existing AuthGuard route checks
// http://stackoverflow.com/questions/34934009/handling-401s-globally-with-angular-2

@Injectable()
export class AuthenticateXHRBackend extends XHRBackend {

  constructor(_browserXhr: BrowserXhr, _baseResponseOptions: ResponseOptions, _xsrfStrategy: XSRFStrategy) {
    super(_browserXhr, _baseResponseOptions, _xsrfStrategy);
  }

  createConnection(request: Request) {
    let xhrConnection = super.createConnection(request);
    xhrConnection.response = xhrConnection.response
      .pipe(catchError((error: HttpErrorResponse, caught: Observable<any>) => {
        if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {

          console.log('The authentication session expired or the user is not authorized. Force refresh of the current page.');
          /* Great solution for bundling with Auth Guard! 
          1. Auth Guard checks authorized user (e.g. by looking into LocalStorage). 
          2. On 401/403 response you clean authorized user for the Guard (e.g. by removing coresponding parameters in LocalStorage). 
          3. As at this early stage you can't access the Router for forwarding to the login page,
          4. refreshing the same page will trigger the Guard checks, which will forward you to the login screen */
          localStorage.removeItem('auth_token');
          window.location.href = window.location.href + '?' + new Date().getMilliseconds();
        }
        return throwError(this.generalErrorHandler(error, caught));
      }));
    return xhrConnection;
  }

  generalErrorHandler(error: any, caught: Observable<any>): Observable<any> {
    console.log('error caught: ', error);
    //if (error.error.status == "INVALID_TOKEN" || error.error.status == "MAX_TOKEN_ISSUE_REACHED") {
    //  console.log('token has expired');
    //  return error;
    //}
    return error;
  }
}
