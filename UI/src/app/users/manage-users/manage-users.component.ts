import { Component } from '@angular/core';
import {NavbarComponent} from "../../shared/display/navbars/navbars.component";
import {UserDisplayComponent} from "../../shared/display/user-display/user-display.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {UserService} from '../user.service';
import {User} from '../models/user.model';
import {Role} from '../models/role.enum';
import {Shift} from '../../shifts/models/shift.model';
import {LogoDisplayComponent} from '../../shared/display/logo-display/logo-display.component';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    NavbarComponent,
    UserDisplayComponent,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    LogoDisplayComponent
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
  newUser: User = { id: 0, firstName: '', lastName: '', email: '', username: '', password: '', role: 1 };
  editUser: User = { id: 0, firstName: '', lastName: '', email: '', username: '', password: '', role: 1 };
  showForm: boolean = false;
  users: User[] = [];
  roles = Object.keys(Role).filter(key => isNaN(Number(key))).map(key => ({ value: (Role as any)[key], label: key }));
  editedRow: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    this.newUser.role = Number(this.newUser.role); // Convert role to integer
    this.userService.createUser(this.newUser).subscribe((user: User) => {
      console.log('User created:', user);
      this.toggleForm();
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  getRoleLabel(role: number): string {
    const roleObj = this.roles.find(r => r.value === role);
    return roleObj ? roleObj.label : '';
  }

  sortOrder: { [key: string]: boolean } = {};
  sortTable(column: keyof User): void {
    const sortOrder = this.sortOrder[column] = !this.sortOrder[column];
    this.users.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      if (column === 'role') {
        aValue = Role[aValue as number];
        bValue = Role[bValue as number];
      }

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

  toggleEditRow(index: number): void {
    if (this.editedRow === index) {
      this.editUser.role = Number(this.editUser.role);
      console.log('Updating user:', this.editUser);
      this.userService.updateUser(this.editUser.id, this.editUser).subscribe(() => {
        this.loadUsers();
        this.editedRow = null;
      });
    } else {
      this.editedRow = index;
      this.editUser = { ...this.users[index] };
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
      this.editedRow = null;
    });
  }

  passwordVisibility: { [key: number]: boolean } = {};

  togglePasswordVisibility(index: number): void {
    this.passwordVisibility[index] = !this.passwordVisibility[index];
  }
}
