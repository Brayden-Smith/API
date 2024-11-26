import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../shift.service';
import { UserService } from '../../users/user.service';
import { Shift } from '../models/shift.model';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';
import { NavbarComponent } from '../../shared/display/navbars/navbars.component';
import { UserDisplayComponent } from '../../shared/display/user-display/user-display.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {LogoDisplayComponent} from '../../shared/display/logo-display/logo-display.component';

@Component({
  selector: 'app-manage-shifts',
  standalone: true,
  imports: [
    NavbarComponent,
    UserDisplayComponent,
    FormsModule,
    CommonModule,
    LogoDisplayComponent
  ],
  templateUrl: './manage-shifts.component.html',
  styleUrl: './manage-shifts.component.css'
})
export class ManageShiftsComponent implements OnInit {
  newShift: Shift = { id: 0, name: "", dateTime: new Date(), role: Role.Admin };
  editShift: Shift = { id: 0, name: "", dateTime: new Date(), role: Role.Admin };
  users: User[] = [];
  shifts: Shift[] = [];
  roles = Object.keys(Role).filter(key => isNaN(Number(key)));
  showForm: boolean = false;
  editedRow: number | null = null;

  constructor(private shiftService: ShiftService, private userService: UserService) {}
  sortOrder: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.loadShifts();
    this.loadUsers();
  }

  findRoleNumberByName(roleName: string): number | undefined {
    return Role[roleName as keyof typeof Role];
  }

  loadShifts(): void {
    this.shiftService.getShifts().subscribe((shifts: Shift[]) => {
      this.userService.getUsers().subscribe((users: User[]) => {
        this.shifts = shifts.map(shift => {
          const user = users.find(u => u.username === shift.username);
          return {
            ...shift,
            fullName: user ? `${user.firstName} ${user.lastName}` : 'Unassigned'
          };
        });
      });
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  findUserById(id: number): User | undefined {
    return this.users.find(user => user.id === Number(id));
  }

  onSubmit(): void {
    const user = this.findUserById(this.newShift.id);
    const roleNumber = this.findRoleNumberByName(this.newShift.role as unknown as string);
    if (user && roleNumber !== undefined) {
      this.newShift.username = user.username;
      this.newShift.role = roleNumber;
      console.log('Submitting shift:', this.newShift);
      this.shiftService.addShift(this.newShift).subscribe(() => {
        console.log('Shift created successfully');
        this.loadShifts();
      }, error => {
        console.error('Error creating shift:', error);
      });
    } else {
      console.error('User or role not found');
    }
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

  toggleEditRow(index: number): void {
    if (this.editedRow === index) {
      this.saveRow();
    } else {
      this.editRow(index);
    }
  }

  editRow(index: number): void {
    this.editedRow = index;
    const shiftToEdit = this.shifts[index];
    this.editShift = {
      ...shiftToEdit,
      role: Role[shiftToEdit.role as unknown as keyof typeof Role],
      username: shiftToEdit.username || ''
    };
    console.log('Editing shift:', this.editShift);
  }

  saveRow(): void {
    if (this.editedRow !== null) {
      const shiftToUpdate = this.shifts[this.editedRow];
      shiftToUpdate.name = this.editShift.name;
      shiftToUpdate.dateTime = this.editShift.dateTime;
      shiftToUpdate.role = this.findRoleNumberByName(this.editShift.role as unknown as string) as number;

      if (this.editShift.username === '') {
        shiftToUpdate.username = undefined;
        shiftToUpdate.fullName = 'Unassigned';
      } else {
        const selectedUser = this.users.find(user => user.username === this.editShift.username);
        if (selectedUser) {
          shiftToUpdate.username = selectedUser.username;
          shiftToUpdate.fullName = `${selectedUser.firstName} ${selectedUser.lastName}`;
        }
      }

      console.log('Updating shift:', shiftToUpdate);
      this.shiftService.updateShift(shiftToUpdate.id, shiftToUpdate).subscribe(() => {
        console.log('Shift updated successfully');
        this.loadShifts();
      }, error => {
        console.error('Error updating shift:', error);
      });
      this.editedRow = null;
    }
  }

  deleteShift(id: number): void {
    this.shiftService.deleteShift(id).subscribe(() => {
      console.log('Shift deleted successfully');
      this.loadShifts();
      this.editedRow = null; // Exit editing mode
    }, error => {
      console.error('Error deleting shift:', error);
    });
  }
}
