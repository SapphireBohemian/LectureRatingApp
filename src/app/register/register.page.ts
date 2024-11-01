import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username = '';
  password = '';
  role = 'student';
  name = '';
  surname = '';
  email = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.username && this.password && this.role && this.name && this.surname && this.email) {
      this.authService.register(this.username, this.password, this.role, this.name, this.surname, this.email).subscribe(
        (response) => {
          this.successMessage = 'Registration successful! Please wait for admin approval before logging in.';
          this.router.navigate(['/login']);
        },
        (error) => {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill all fields';
    }
  }
}
