// admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:3000'; // Your backend URL

  constructor(private http: HttpClient) {}

  // Get all students
  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  // Create a new student
  createStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, studentData);
  }

  // Update a student
  updateStudent(studentId: string, studentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${studentId}`, studentData);
  }

  // Delete a student
  deleteStudent(studentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${studentId}`);
  }

  // Similar methods for lecturers and feedback...
}
