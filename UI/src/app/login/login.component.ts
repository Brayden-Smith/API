import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
          this.router.navigate(['/home']);
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
