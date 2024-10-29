import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private baseUrl = 'http://localhost:3000/analytics';

  constructor(private http: HttpClient) {}

  getAverageRatings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/average-ratings`);
  }

  getRatingTrends(): Observable<any> {
    return this.http.get(`${this.baseUrl}/rating-trends`);
  }
}
