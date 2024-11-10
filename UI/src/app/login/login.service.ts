import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) {}

  queryLogin(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      params: {
        username: username,
        password: password
      },
      responseType: 'text' as 'json'
    });
  }
}
