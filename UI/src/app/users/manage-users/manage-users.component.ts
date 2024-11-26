import { Component } from '@angular/core';
import {NavbarComponent} from "../../shared/display/navbars/navbars.component";
import {UserDisplayComponent} from "../../shared/display/user-display/user-display.component";

@Component({
  selector: 'app-manage-users',
  standalone: true,
    imports: [
        NavbarComponent,
        UserDisplayComponent
    ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {

}
