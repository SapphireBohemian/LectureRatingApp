import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // Adjust the path as needed
import { StudentService } from 'src/app/student.service';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss'],
})
export class StudentManagementComponent implements OnInit {
  students: any[] = [];
  newStudent = { username: '', password: '' }; // Adjust according to your data model

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe((data) => {
      this.students = data;
    });
  }

  addStudent() {
    this.studentService.addStudent(this.newStudent).subscribe(() => {
      this.loadStudents();
      this.newStudent = { username: '', password: '' }; // Reset form
    });
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  // Additional methods for editing can be added here
}
