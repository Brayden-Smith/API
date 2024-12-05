import {Component, OnInit} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '../../../login/login.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-display.component.html',
  styleUrl: './user-display.component.css'
})
export class UserDisplayComponent implements OnInit {
  isDropdownOpen: boolean = false;
  username: string = "";

  constructor(private router: Router, private loginService: LoginService) {}

  //show the log-out drop down
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log("isDropdownOpen: ", this.isDropdownOpen);
  }

  //remove the logged-in user and go back to log in screen
  logout() {
    localStorage.removeItem('username'); // Clear the stored username
    this.username = ''; // Reset the username in the component
    this.isDropdownOpen = false; // Close the dropdown
    this.router.navigate(['/login']);
  }

  //get the username so we can display it
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
  }
}
