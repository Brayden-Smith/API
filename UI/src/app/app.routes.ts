import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'shifts', component: ShiftsComponent },
    { path: 'users', component: UsersComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home by default
    { path: '**', redirectTo: '/home', pathMatch: 'full' } // Wildcard route for a 404 page
  ];
