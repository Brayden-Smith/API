import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {CommonModule} from '@angular/common';



import {NavbarComponent} from '../shared/display/navbars/navbars.component';
import {UserDisplayComponent} from '../shared/display/user-display/user-display.component';
import {Shift} from '../shifts/models/shift.model';
import {ShiftService} from '../shifts/shift.service';


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
  userShifts: Shift[] = [];
  username: string = '';

  constructor(private router: Router,private shiftService: ShiftService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.loadShifts();
  }

  loadShifts(): void {
    this.shiftService.getUserShifts(this.username).subscribe((data: Shift[]) => {
      this.userShifts = data;
    });
  }

}
