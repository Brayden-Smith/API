import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/view users/users.component';
import { LoginComponent } from './login/login.component';
import {PickupShiftsComponent} from './shifts/pickup-shifts/pickup-shifts.component';
import {ManageShiftsComponent} from './shifts/manage-shifts/manage-shifts.component';
import {ManageUsersComponent} from './users/manage-users/manage-users.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'pickupShifts', component: PickupShiftsComponent },
    { path: 'manageShifts', component: ManageShiftsComponent },
    { path: 'manageUsers', component: ManageUsersComponent },
    { path: 'users', component: UsersComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to home by default
    { path: '**', redirectTo: '/login', pathMatch: 'full' } // Wildcard route for a 404 page
  ];
