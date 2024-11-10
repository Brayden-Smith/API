import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private loginService: LoginService) {}
  username: string = '';
  password: string = '';


  onLogin() {

    this.loginService.queryLogin(this.username, this.password).subscribe(
      response => {
        console.log('Response:', response);
        if (response.trim() === 'Login successful') {
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error('Login error:', error);
      }
    );

  }
}
