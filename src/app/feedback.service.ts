//feedback.service.js
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';// Import the AuthService to access the token

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'https://192.168.0.145/feedback:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper method to get headers with the token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Ensure AuthService has a method to get the token
    console.log('Token:', token); // Log the token
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  

  // feedback.service.js
submitFeedback(lecturerName: string, course: string, feedback: string, rating: number, department: string): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.post(this.apiUrl, { lecturerName, course, feedback, rating, department }, { headers });
}


  // Get feedback for the logged-in user
  getFeedback(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Get filtered feedback based on lecturer name and/or course
  // feedback.service.js
getFilteredFeedback(filters: any): Observable<any[]> {
  let params = new HttpParams();
  if (filters.lecturerName) params = params.append('lecturerName', filters.lecturerName);
  if (filters.course) params = params.append('course', filters.course);
  if (filters.department) params = params.append('department', filters.department); // Add department filter

  const headers = this.getAuthHeaders();
  return this.http.get<any[]>(this.apiUrl, { params, headers });
}


  // Update feedback by ID
  updateFeedback(id: string, updatedFeedback: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, updatedFeedback, { headers });
  }

  // Delete feedback by ID
  deleteFeedback(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
