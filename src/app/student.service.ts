//student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://192.168.0.145/users:3000'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  // Get all students
getAllStudents(): Observable<any> {
  return this.http.get(`${this.apiUrl}?role=student`);
}

  addStudent(student: any): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Add methods for updating/editing students if necessary
}
