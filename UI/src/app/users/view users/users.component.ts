// users.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

import {NavbarComponent} from '../../shared/display/navbars/navbars.component';
import {LogoDisplayComponent} from '../../shared/display/logo-display/logo-display.component';
import {Role} from '../models/role.enum';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,
    NavbarComponent, LogoDisplayComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  roleByNumber(roleNumber: number): string {
    return Role[roleNumber];
  }

  loadUsers(): void {
    const loggedInUsername = localStorage.getItem('username');
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data.filter(user => user.username !== loggedInUsername);
    });
  }

  //if the table is clicked, sort the table by the column clicked
  sortOrder: { [key: string]: boolean } = {};
  sortTable(column: keyof User): void {
    const sortOrder = this.sortOrder[column] = !this.sortOrder[column];
    this.users.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      //make sure we enum convert
      if (column === 'role') {
        aValue = Role[aValue as number];
        bValue = Role[bValue as number];
      }

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      //make it not case sensitive. also have to be careful of null data
      const aString = aValue !== null ? String(aValue).toLowerCase() : null;
      const bString = bValue !== null ? String(bValue).toLowerCase() : null;

      if (aString === null || bString === null) {
        return 0;
      } else if (aString < bString) {
        return sortOrder ? -1 : 1;
      } else if (aString > bString) {
        return sortOrder ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
