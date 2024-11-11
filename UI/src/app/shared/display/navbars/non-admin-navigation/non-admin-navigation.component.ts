import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-non-admin-navigation',
  standalone: true,
    imports: [
        RouterLink,
        CommonModule
    ],
  templateUrl: './non-admin-navigation.component.html',
  styleUrl: './non-admin-navigation.component.css'
})
export class NonAdminNavigationComponent {

}
