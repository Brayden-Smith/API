import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/login`;
  username: string = "";

  constructor(private http: HttpClient) {}

  //checks to see if hte log in is successful
  queryLogin(username: string, password: string): Observable<any> {
    this.username = username;
    return this.http.get<any>(`${this.apiUrl}`, {
      params: {
        username: username,
        password: password
      },
      responseType: 'text' as 'json'
    });
  }


  getUser(): string {
    return this.username;
  }
}
