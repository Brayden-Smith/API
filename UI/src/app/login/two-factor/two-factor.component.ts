import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./two-factor.component.css']
})
export class TwoFactorComponent {
  @Input() twoFactored: boolean = false;
  @Output() twoFactoredChange = new EventEmitter<boolean>();
  code: string[] = ['', '', '', '', '', '', '', ''];
  errorMessage: string = '';

  //move to next input box
  moveToNext(event: Event, nextIndex: number) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && nextIndex < this.code.length) {
      const nextInput = document.getElementById(`code${nextIndex}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  //move back a box
  moveToPrevious(event: KeyboardEvent, currentIndex: number) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && input.value.length === 0 && currentIndex > 0) {
      const previousInput = document.getElementById(`code${currentIndex - 1}`) as HTMLInputElement;
      if (previousInput) {
        previousInput.focus();
      }
    }
  }

  //service check. regex checks if its all numbers
  validateCode() {
    const codeString = this.code.join('');
    if (codeString.length === 8 && /^\d+$/.test(codeString)) {
      this.twoFactored = true;
      this.twoFactoredChange.emit(this.twoFactored);
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Invalid code. Please enter an 8-digit code.';
    }
  }
}
