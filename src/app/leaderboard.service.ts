import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private baseUrl = 'http://localhost:3000/feedback'; // Base URL for your API

  constructor(private http: HttpClient) {}

  getTopRatedLecturers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/average-ratings`);
  }
}
