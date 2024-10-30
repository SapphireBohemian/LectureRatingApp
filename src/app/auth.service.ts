//auth.service.ts
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Your backend URL
  private tokenKey = 'token';
  private userKey = 'user'; // Key for storing user information

   // Emit login events
   loginStatusChange: EventEmitter<void> = new EventEmitter();

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
    return !!localStorage.getItem(this.tokenKey); // Assuming the token is stored in localStorage
  }

  // Get the logged-in user's role
  getRole(): string | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData).role : null; // Assuming the user data is stored in localStorage
  }

// Update setSession method to include username
  setSession(token: string, user: any): void {
    localStorage.setItem(this.tokenKey, token); // Store token in localStorage
    localStorage.setItem(this.userKey, JSON.stringify(user)); // Store user info including role and username
    this.loginStatusChange.emit(); // Emit login event to notify components

    }

  // Retrieve logged-in user's name
  getLoggedInUserName(): string | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user).username : null;
  }


  // Logout user
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey); // Remove user data
    this.loginStatusChange.emit();
  }
}
