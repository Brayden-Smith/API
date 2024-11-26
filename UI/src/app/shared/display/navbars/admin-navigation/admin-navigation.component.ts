import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {LogoDisplayComponent} from '../../logo-display/logo-display.component';

@Component({
  selector: 'app-admin-navigation',
  standalone: true,
  imports: [
    RouterLink,
    LogoDisplayComponent,
    RouterOutlet
  ],
  templateUrl: './admin-navigation.component.html',
  styleUrl: './admin-navigation.component.css'
})
export class AdminNavigationComponent {

}
