import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'schedule';

  //if you are not logged in, you will be redirected to the login page
  constructor(private router: Router) {
    const username = localStorage.getItem('username');
    if (!username) {
      this.router.navigate(['/login']);
    }
  }
}
