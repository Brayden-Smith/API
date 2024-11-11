import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { environment } from '../../environment';
import {Shift} from '../shifts/models/shift.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserRole(username: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/role/${username}`, {
      params: {
        username: username,
      },
    });
  }
}
