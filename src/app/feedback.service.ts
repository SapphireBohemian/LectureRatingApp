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

  submitFeedback(lecturerName: string, course: string, feedback: string): Observable<any> {
    //const feedbackData = {
    //  lecturerName,
   ////   course,
    //  feedback
  //  };
    return this.http.post(this.apiUrl ,  { lecturerName, course, feedback });
  }

  getFeedback(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFilteredFeedback(filters: any): Observable<any> {
    let params = new HttpParams();
    if (filters.lecturerName) params = params.append('lecturerName', filters.lecturerName);
    if (filters.course) params = params.append('course', filters.course);

    return this.http.get(this.apiUrl, { params });
  }

}
