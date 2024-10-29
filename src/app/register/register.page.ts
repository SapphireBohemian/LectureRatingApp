import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Authentication service

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  password: string = '';
  role: string = 'student'; // Default to student role
  errorMessage: string = ''; // Error message for failed registration
  successMessage: string = ''; // Success message for successful registration

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.username && this.password && this.role) {
      this.authService.register(this.username, this.password, this.role).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.successMessage = 'Registration successful! Please wait for admin approval before logging in.';
          this.router.navigate(['/login']); // Redirect to login page after registration
        },
        (error) => {
          console.error('Error during registration:', error);
          this.errorMessage = 'Registration failed. Please try again.'; // Show an error message to the user
        }
      );
    } else {
      this.errorMessage = 'Please fill all fields'; // Handle form validation
    }
  }
}
