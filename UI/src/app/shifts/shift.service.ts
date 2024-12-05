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

  //just gets all shifts
  getShifts(): Observable<Shift[]> {
    return this.http.get<Shift[]>(this.apiUrl);
  }

  //gets all unassigned shifts
  getShiftsWithNullUsername(): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${this.apiUrl}/null-username`);
  }

  //changes the ownership of the shift to a new user
  updateShiftUsername(id: number, username: string | null): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/${username}`, username, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  //normal post for shift model
  addShift(newShift: Shift): Observable<Shift> {
    return this.http.post<Shift>(this.apiUrl, newShift, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  //normal edit command for shift model
  updateShift(id: number, updatedShift: Shift): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/update`, updatedShift, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  //normal delete command for shift model
  deleteShift(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
