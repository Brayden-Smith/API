import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TwoFactorComponent } from './two-factor/two-factor.component';
import { CredentialsComponent } from './credentials/credentials.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TwoFactorComponent,
    CredentialsComponent
  ],
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;
  twoFactored: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navigateBasedOnState();
  }

  onTwoFactoredChange(newValue: boolean) {
    this.twoFactored = newValue;
    this.navigateBasedOnState();
  }

  onLoggedInChange(newValue: boolean) {
    this.loggedIn = newValue;
    this.navigateBasedOnState();
  }

  private navigateBasedOnState() {
    if (this.loggedIn) {
      if (this.twoFactored) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/two-factor']);
      }
    } else {
      this.router.navigate(['/credentials']);
    }
  }
}
