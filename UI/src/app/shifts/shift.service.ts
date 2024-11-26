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

  getShifts(): Observable<Shift[]> {
    return this.http.get<Shift[]>(this.apiUrl);
  }

  getUserShifts(username: string): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${this.apiUrl}/user/${username}`, {
      params: {
        username: username,
      },
    });
  }

  getShiftsWithNullUsername(): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${this.apiUrl}/null-username`);
  }

  updateShiftUsername(id: number, username: string | null): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/${username}`, username, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  addShift(newShift: Shift): Observable<Shift> {
    return this.http.post<Shift>(this.apiUrl, newShift, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateShift(id: number, updatedShift: Shift): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/update`, updatedShift, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteShift(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
