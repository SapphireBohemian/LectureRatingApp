//student-management.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // Adjust the path as needed
import { StudentService } from 'src/app/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss'],
})
export class StudentManagementComponent implements OnInit {
  students: any[] = [];
  newStudent = { name: '', surname:'', email:'', username: '', password: '', role: 'student' }; // Adjust according to your data model

  constructor(private studentService: StudentService, private router: Router, private location: Location) {}

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
      this.newStudent = { name:'',surname:'',email:'',  username: '', password: '', role: 'student' }; // Reset form
    });
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  goBack() {
    this.location.back();
  }
  // Additional methods for editing can be added here
}
