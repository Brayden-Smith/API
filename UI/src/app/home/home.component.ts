import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {CommonModule} from '@angular/common';



import {NavbarComponent} from '../shared/display/navbars/navbars.component';
import {UserDisplayComponent} from '../shared/display/user-display/user-display.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    UserDisplayComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  username: string = '';

  constructor(private router: Router,) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
  }

}
