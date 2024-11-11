import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private baseUrl = 'http://192.168.0.145/feedback'; // Base URL for your API
  //private baseUrl = 'https://lecture-rating-backend.onrender.com'; // Backend URL

  constructor(private http: HttpClient) {}

  getTopRatedLecturers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/average-ratings`);
  }
}
