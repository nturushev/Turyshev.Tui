import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FlightComponent } from './flight/flight.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'flight', component: FlightComponent },
  { path: 'account', loadChildren: 'app/account/account.module#AccountModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
