import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credentials',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent {
  @Input() loggedIn: boolean = false;
  @Output() loggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private loginService: LoginService) {}

  username: string = '';
  password: string = '';
  isLoggingIn: boolean = false;
  loginError: boolean = false;

  onLogin() {
    this.isLoggingIn = true;
    this.loginError = false;

    this.loginService.queryLogin(this.username, this.password).subscribe(
      response => {
        console.log('Response:', response);
        if (response.trim() === 'Login successful') {
          localStorage.setItem('username', this.loginService.getUser());
          this.loggedIn = true;
          this.loggedInChange.emit(this.loggedIn);
        } else {
          this.loginError = true;
        }
        this.isLoggingIn = false;
      },
      error => {
        console.error('Login error:', error);
        this.loginError = true;
        this.isLoggingIn = false;
      }
    );
  }
}
