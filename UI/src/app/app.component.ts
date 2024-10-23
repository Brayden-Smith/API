import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'schedule';

  constructor (private http: HttpClient) {}

  ngOnInit(): void {
        this.http.get<string>("http://localhost:5156/Schedule").subscribe(res => this.title = res);
    }

}
