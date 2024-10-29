//auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

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
  //login(username: string, password: string): Observable<any> {
  //  return this.http.post(`${this.apiUrl}/login`, { username, password });
 // }

 login(username: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
    catchError(error => {
      if (error.status === 403) {
        return throwError(() => new Error('Account pending approval by admin.'));
      }
      return throwError(() => new Error('Invalid username or password'));
    })
  );
}
 
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Assuming the token is stored in localStorage
  }

  // Get the logged-in user's role
  getRole(): string | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData).role : null; // Assuming the user data is stored in localStorage
  }

  // Set user data and token after login
  setSession(token: string, user: any): void {
    localStorage.setItem('token', token); // Store token in localStorage
    localStorage.setItem('user', JSON.stringify(user)); // Store user info including role
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove user data
  }
}
