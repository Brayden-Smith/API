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

  //make sure we are where we need to be
  ngOnInit(): void {
    this.navigateBasedOnState();
  }

  //if sub component changes the logged in state do a route change
  onTwoFactoredChange(newValue: boolean) {
    this.twoFactored = newValue;
    this.navigateBasedOnState();
  }

  //if sub component changes the logged in state do a route change
  onLoggedInChange(newValue: boolean) {
    this.loggedIn = newValue;
    this.navigateBasedOnState();
  }

  //route pathing for logging in
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
