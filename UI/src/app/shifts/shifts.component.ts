// shifts.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftService } from './shift.service';
import { Shift } from './models/shift.model';

@Component({
  selector: 'app-shifts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements OnInit {
  shifts: Shift[] = [];

  constructor(private shiftService: ShiftService) {}

  ngOnInit(): void {
    this.loadShifts();
  }

  loadShifts(): void {
    this.shiftService.getShifts().subscribe((data: Shift[]) => {
      this.shifts = data;
    });
  }
}