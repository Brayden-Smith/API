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
  //imma be real with you chief, I have no idea what this is doing i just added stuff until it worked
  roles = Object.keys(Role).filter(key => isNaN(Number(key))).map(key => ({ value: (Role as any)[key], label: key }));
  editedRow: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  //add new user based on the input boxes
  onSubmit(): void {
    this.newUser.role = Number(this.newUser.role); // Convert role to integer
    this.userService.createUser(this.newUser).subscribe((user: User) => {
      console.log('User created:', user);
      this.toggleForm();
      this.loadUsers();
    });
  }

  //fill out list of users
  loadUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  //litterally just enum convertor
  getRoleLabel(role: number): string {
    const roleObj = this.roles.find(r => r.value === role);
    return roleObj ? roleObj.label : '';
  }

  //sorts the table based on which column was clicked
  sortOrder: { [key: string]: boolean } = {};
  sortTable(column: keyof User): void {
    const sortOrder = this.sortOrder[column] = !this.sortOrder[column];
    this.users.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      //make sure to enum convert
      if (column === 'role') {
        aValue = Role[aValue as number];
        bValue = Role[bValue as number];
      }


      //check for null and case senstive
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

  //if edit button is clicked then we either have to set that row to be edited or we are done and can update user
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

  //just service call to delete user
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
      this.editedRow = null;
    });
  }

  passwordVisibility: { [key: number]: boolean } = {};

  //change if password is in plaintext
  togglePasswordVisibility(index: number): void {
    this.passwordVisibility[index] = !this.passwordVisibility[index];
  }
}
