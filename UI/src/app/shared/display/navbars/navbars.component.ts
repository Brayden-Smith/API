import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {UserService} from '../../../users/user.service';


import {AdminNavigationComponent} from './admin-navigation/admin-navigation.component';
import {NonAdminNavigationComponent} from './non-admin-navigation/non-admin-navigation.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbars.component.html',
  imports: [
    CommonModule,
    AdminNavigationComponent,
    NonAdminNavigationComponent
  ],
  standalone: true
})


export class NavbarComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  username: string = '';
  userRole: number = -1;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';

    this.userService.getUserRole(this.username).subscribe((data: number) => {
      this.userRole = data;
      console.log('User role:', this.userRole);

      if(this.userRole == 0) {
        this.isAdmin = true;
      }

    });
  }
}
