import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule} from '@angular/common';
import {LogoDisplayComponent} from "../../logo-display/logo-display.component";

@Component({
  selector: 'app-non-admin-navigation',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    LogoDisplayComponent,
    RouterOutlet
  ],
  templateUrl: './non-admin-navigation.component.html',
  styleUrl: './non-admin-navigation.component.css'
})
export class NonAdminNavigationComponent {

}
