// pending-users.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pending-users',
  templateUrl: './pending-users.component.html',
  styleUrls: ['./pending-users.component.scss']
})
export class PendingUsersComponent implements OnInit {
  pendingUsers: any[] = [];

  constructor(private adminService: AdminService, private location: Location) {}

  ngOnInit(): void {
    this.loadPendingUsers();
  }

  loadPendingUsers(): void {
    this.adminService.getPendingUsers().subscribe(
      (users) => {
        this.pendingUsers = users;
      },
      (error) => {
        console.error('Error loading pending users:', error);
      }
    );
  }

  approveUser(userId: string): void {
    this.adminService.approveUser(userId).subscribe(
      () => {
        this.pendingUsers = this.pendingUsers.filter(user => user._id !== userId);
        alert('User approved successfully');
      },
      (error) => {
        console.error('Error approving user:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteStudent(userId).subscribe(
        () => {
          this.pendingUsers = this.pendingUsers.filter(user => user._id !== userId);
          alert('User deleted successfully');
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }
}
