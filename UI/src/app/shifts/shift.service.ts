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
}