//feedbackservice.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'http://localhost:3000/feedback'; // Update this URL to your backend endpoint

  constructor(private http: HttpClient) {}

  // Submit new feedback
  submitFeedback(lecturerName: string, course: string, feedback: string, rating: number, userId: string): Observable<any> {
    return this.http.post(this.apiUrl, { lecturerName, course, feedback, rating, userId });
  }


  // Get all feedback
  getFeedback(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get filtered feedback based on lecturer name and/or course
  getFilteredFeedback(filters: any): Observable<any[]> {
    let params = new HttpParams();
    if (filters.lecturerName) params = params.append('lecturerName', filters.lecturerName);
    if (filters.course) params = params.append('course', filters.course);

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  // Get the highest-rated lecturer
  getHighestRatedLecturer(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/highest-rated`);
  }

  // Update feedback by ID (Add this method for editing feedback)
  updateFeedback(id: string, updatedFeedback: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedFeedback);
  }

  // Delete feedback by ID
  deleteFeedback(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

