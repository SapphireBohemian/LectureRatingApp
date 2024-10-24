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

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.password, this.role).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']); // Redirect to login page after registration
      },
      (error) => {
        console.error('Error during registration:', error);
      }
    );
  }
}
