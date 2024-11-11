// users.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { User } from './models/user.model';
import {RouterLink} from "@angular/router";

import {UserDisplayComponent} from '../shared/display/user-display/user-display.component';
import {NavbarComponent} from '../shared/display/navbars/navbars.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    UserDisplayComponent,
    NavbarComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
}
