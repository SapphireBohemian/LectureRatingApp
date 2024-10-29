//admin-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '../role.guard'; // Ensure the guard is imported
import { AdminPage } from './admin.page';
import { StudentManagementComponent } from './student-management/student-management.component';
import { LecturerManagementComponent } from './lecturer-management/lecturer-management.component';
import { FeedbackManagementComponent } from './feedback-management/feedback-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  { path: 'students', component: StudentManagementComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
  { path: 'lecturers', component: LecturerManagementComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
  { path: 'feedback', component: FeedbackManagementComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
