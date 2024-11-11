import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private baseUrl = 'http://192.168.0.145/analytics:3000';
  //private apiUrl = 'https://lecture-rating-backend.onrender.com'; // Backend URL

  constructor(private http: HttpClient) {}

  getAverageRatings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/average-ratings`);
  }

  getRatingTrends(): Observable<any> {
    return this.http.get(`${this.baseUrl}/rating-trends`);
  }
}
