//auth.service.ts
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Backend URL
  private tokenKey = 'token';
  private userKey = 'user';

  // Emit login events
  loginStatusChange: EventEmitter<void> = new EventEmitter();

  constructor(private http: HttpClient) {}

  // Register a new user with additional fields
  register(username: string, password: string, role: string, name: string, surname: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password, role, name, surname, email });
  }

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

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) {
        console.error('Token has expired');
        return null;
      }
      return token;
    }
    return null;
  }

  getUserId() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData).role : null;
  }

  // Update setSession to include user details
  setSession(token: string, user: any): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.loginStatusChange.emit();
  }

  getLoggedInUserName(): string | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user).username : null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.loginStatusChange.emit();
  }

  // Additional methods for profile management
  getUserProfile(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  
  updateUserProfile(data: any): Observable<any> {
    const token = this.getToken();
    return this.http.put(`${this.apiUrl}/user/profile`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  
  deleteAccount(): Observable<any> {
    const token = this.getToken();
    return this.http.delete(`${this.apiUrl}/user/account`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }  
}
