//login.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Error message for failed login

  constructor(private authService: AuthService, private router: Router, private location: Location) {}

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          // Store token and user info in session
          this.authService.setSession(response.token, { role: response.role, username: response.username });

          // Redirect user based on role
          if (response.role === 'student') {
            this.router.navigate(['/student']);
          } else if (response.role === 'lecturer') {
            this.router.navigate(['/lecturer']);
          } else if (response.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            console.error('Unknown role:', response.role);
          }
        },
        (error) => {
          console.error('Error during login:', error);
          this.errorMessage = 'Invalid credentials. Please try again.'; // Error message for login failure
        }
      );
    } else {
      this.errorMessage = 'Please enter both username and password'; // Prompt for form validation
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
