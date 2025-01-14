import { Component, OnInit } from '@angular/core';
import { ShiftService } from './shift.service';
import {Shift} from './models/shift.model';
import {LogoDisplayComponent} from '../shared/display/logo-display/logo-display.component';
import {NavbarComponent} from '../shared/display/navbars/navbars.component';
import { DatePipe, CommonModule } from '@angular/common';
import {Role} from '../users/models/role.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    LogoDisplayComponent,
    NavbarComponent,
    DatePipe,
    CommonModule
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = '';
  userShifts: Shift[] = [];
  nextShift: Shift | null = null;
  workersOnNextShift: { username: string }[] = [];
  remainingShifts: Shift[] = [];

  constructor(private ShiftService: ShiftService) {}

  //get all shifts
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'User';
    this.loadShifts();
  }

  //service call to get all shifts
  loadShifts(): void {
    this.ShiftService.getUserShifts(this.username).subscribe((shifts: Shift[]) => {
      this.userShifts = shifts;
      this.setNextShift();
      this.setRemainingShifts();
    });
  }

  //figure out what the earliest shift is
  setNextShift(): void {
    if (this.userShifts.length > 0) {
      this.nextShift = this.userShifts.reduce((earliest, current) => {
        return new Date(current.dateTime) < new Date(earliest.dateTime) ? current : earliest;
      });
      this.loadWorkersOnNextShift();
    }
  }

  //figure out what workers are on the next shift
  loadWorkersOnNextShift(): void {
    if (this.nextShift) {
      this.ShiftService.getUsernamesForShift(this.nextShift.id).subscribe((workers: string[]) => {
        this.workersOnNextShift = workers
          .filter(username => username !== this.username)
          .map(username => ({ username }));
      });
    }
  }

  //list all none next shifts
  setRemainingShifts(): void {
    const nextShiftDate = this.nextShift ? new Date(this.nextShift.dateTime) : new Date();
    this.remainingShifts = this.userShifts.filter(shift => new Date(shift.dateTime) > nextShiftDate);
  }

  //sort the table based on which column was clicked
  sortOrder: { [key: string]: boolean } = {};
  sortTable(column: keyof Shift): void {
    const sortOrder = this.sortOrder[column] = !this.sortOrder[column];
    this.remainingShifts.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      //enum convert
      if (column === 'role') {
        aValue = Role[aValue as number];
        bValue = Role[bValue as number];
      }

      //check for case sensitivity and nulls
      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

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

  //enum convert
  roleByNumber(roleNumber: number): string {
    return Role[roleNumber];
  }
}
