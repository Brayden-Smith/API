import {Component, OnInit} from '@angular/core';
import {Shift} from '../models/shift.model';
import {ShiftService} from '../shift.service';
import {NavbarComponent} from '../../shared/display/navbars/navbars.component';
import {UserDisplayComponent} from '../../shared/display/user-display/user-display.component';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Role} from '../models/role.enum';
import {LogoDisplayComponent} from "../../shared/display/logo-display/logo-display.component";

@Component({
  selector: 'app-pickup-shifts',
  standalone: true,
    imports: [
        NavbarComponent,
        UserDisplayComponent,
        DatePipe,
        NgForOf,
        NgIf,
        LogoDisplayComponent
    ],
  templateUrl: './pickup-shifts.component.html',
  styleUrl: './pickup-shifts.component.css'
})
export class PickupShiftsComponent implements OnInit{
  shifts: Shift[] = [];
  username: string = "";
  sortOrder: { [key: string]: boolean } = {};

  constructor(private shiftService: ShiftService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.loadShifts();
  }

  loadShifts(): void {
    this.shiftService.getShiftsWithNullUsername().subscribe((data: Shift[]) => {
      this.shifts = data;
    });
  }

  addShift(shiftId: number): void {
    this.shiftService.updateShiftUsername(shiftId, this.username).subscribe(() => {
      console.log(`Shift ID: ${shiftId} has been updated with username: ${this.username}`);
      this.loadShifts(); // Reload shifts to reflect the changes
    }, error => {
      console.error('Error updating shift:', error);
    });
  }

  sortTable(column: keyof Shift): void {
    const sortOrder = this.sortOrder[column] = !this.sortOrder[column];
    this.shifts.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      if (column === 'role') {
        aValue = Role[aValue as number];
        bValue = Role[bValue as number];
      }

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      const aString = aValue !== null && typeof aValue === 'string' ? aValue.toLowerCase() : null;
      const bString = bValue !== null && typeof bValue === 'string' ? bValue.toLowerCase() : null;

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

  getRoleString(roleNumber: number): string {
    return Role[roleNumber];
  }
}
