// shifts.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftService } from './shift.service';
import { Shift } from './models/shift.model';
import {RouterLink} from "@angular/router";


import {UserDisplayComponent} from '../shared/display/user-display/user-display.component';
import {NavbarComponent} from '../shared/display/navbars/navbars.component';

@Component({
  selector: 'app-shifts',
  standalone: true,
  imports: [CommonModule, RouterLink, UserDisplayComponent, NavbarComponent],
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements OnInit {
  shifts: Shift[] = [];
  userShifts: Shift[] = [];
  username: string = "";

  constructor(private shiftService: ShiftService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.loadShifts();
  }

  loadShifts(): void {
    this.shiftService.getShifts().subscribe((data: Shift[]) => {
      this.shifts = data;
    });

    this.shiftService.getUserShifts(this.username).subscribe((data: Shift[]) => {
      this.userShifts = data;
    });
  }
}
