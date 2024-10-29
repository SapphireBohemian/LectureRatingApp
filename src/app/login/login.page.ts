import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Authentication service

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Error message for failed login

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          // Store JWT token and user role in local storage
          this.authService.setSession(response.token, { role: response.role }); // Store user info including role

          // Redirect user based on their role
          if (response.role === 'student') {
            this.router.navigate(['/student']);
          } else if (response.role === 'lecturer') {
            this.router.navigate(['/lecturer']);
          } else if (response.role === 'admin') {
            this.router.navigate(['/admin']); // Ensure this path is correct
          } else {
            console.error('Unknown role:', response.role); // Handle unknown role
          }
        },
        (error) => {
          console.error('Error during login:', error);
          this.errorMessage = 'Invalid credentials. Please try again.'; // Show an error message to the user
        }
      );
    } else {
      this.errorMessage = 'Please enter both username and password'; // Handle form validation
    }
  }
}
