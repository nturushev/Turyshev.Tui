import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FlightComponent } from './flight/flight.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ConfigService } from './shared/utils/config.service';

//import { routing } from './app.routing';
import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy }from '@angular/http';

import { UserService } from './shared/services/user.service';

import { EmailValidator } from './directives/email.validator.directive';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/modules/shared.module';
import { FlightService } from './shared/services/flight.service';

import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdSortableHeader } from './directives/sortable.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';

@NgModule({
  declarations: [
    EmailValidator, 
    AppComponent,
    NavMenuComponent,
    //  HeaderComponent,
    LoginFormComponent,
    HomeComponent,
    FlightComponent,
    CounterComponent,
    FetchDataComponent,
    NgbdSortableHeader
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    NgOptionHighlightModule,
    HttpModule,
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginFormComponent },
      { path: 'flight', component: FlightComponent, canActivate: [UserService] },
     // { path: 'account', loadChildren: 'app/account/account.module#AccountModule' }
    ])
  ],
  providers: [UserService, FlightService, [ConfigService, {
    provide: XHRBackend,
    useClass: AuthenticateXHRBackend
  }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
