import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Your backend URL

  constructor(private http: HttpClient) {}

  // Register a new user
  register(username: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password, role });
  }

  // Login user
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
  }
}
