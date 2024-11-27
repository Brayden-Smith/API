import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./two-factor.component.css']
})
export class TwoFactorComponent {
  @Input() twoFactored: boolean = false;
  @Output() twoFactoredChange = new EventEmitter<boolean>();
  code: string[] = ['', '', '', '', '', '', '', ''];

  validateCode() {
    const codeString = this.code.join('');
    if (codeString.length === 8 && /^\d+$/.test(codeString)) {
      this.twoFactored = true;
      this.twoFactoredChange.emit(this.twoFactored);
    } else {
      alert('Invalid code. Please enter an 8-digit code.');
    }
  }
}
