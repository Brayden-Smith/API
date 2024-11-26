import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shift } from './models/shift.model';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private apiUrl = `${environment.apiUrl}/shifts`;

  constructor(private http: HttpClient) {}

  getUserShifts(username: string): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${this.apiUrl}/user/${username}`, {
      params: {
        username: username,
      },
    });
  }

  getUsernamesForShift(id: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${id}/usernames`);
  }
}
