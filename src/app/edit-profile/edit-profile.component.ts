//edit.profile.coponent.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.editProfileForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.getUserProfile().subscribe(
      (data) => {
        this.user = data;
        this.editProfileForm.patchValue({
          username: this.user.username,
          name: this.user.name,
          surname: this.user.surname,
          email: this.user.email,
        });
      },
      (error) => {
        alert('Error fetching user profile. Please try again.');
      }
    );
  }

  updateProfile() {
    if (this.editProfileForm.valid) {
      this.authService.updateUserProfile(this.editProfileForm.value).subscribe(
        (response) => {
          alert('Profile updated successfully!');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          alert('Error updating profile. Please try again.');
        }
      );
    }
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.authService.deleteAccount().subscribe(
        (response) => {
          alert('Account deleted successfully.');
          this.router.navigate(['/login']);
        },
        (error) => {
          alert('Error deleting account. Please try again.');
        }
      );
    }
  }
}
