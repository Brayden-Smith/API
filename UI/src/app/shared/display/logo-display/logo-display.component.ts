import { Component } from '@angular/core';
import {UserDisplayComponent} from '../user-display/user-display.component';

@Component({
  selector: 'app-logo-display',
  standalone: true,
  imports: [
    UserDisplayComponent
  ],
  templateUrl: './logo-display.component.html',
  styleUrl: './logo-display.component.css'
})
export class LogoDisplayComponent {

}
