//lecturer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LecturerService {
  private apiUrl = 'http://localhost:3000/users'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  // Get all lecturers
  //getAllLecturers(): Observable<any> {
 //   return this.http.get(this.apiUrl);
 // }
  
  // Get all lecturers
getAllLecturers(): Observable<any> {
  return this.http.get(`${this.apiUrl}?role=lecturer`);
}

  // Add a new lecturer
  addLecturer(lecturer: any): Observable<any> {
    return this.http.post(this.apiUrl, lecturer);
  }

  // Delete a lecturer by ID
  deleteLecturer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Additional methods for updating/editing lecturers can be added here
}
