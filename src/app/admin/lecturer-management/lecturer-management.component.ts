//lecturer-management.component.ts
import { Component, OnInit } from '@angular/core';
import { LecturerService } from 'src/app/lecturer.service';

@Component({
  selector: 'app-lecturer-management',
  templateUrl: './lecturer-management.component.html',
  styleUrls: ['./lecturer-management.component.scss'],
})
export class LecturerManagementComponent implements OnInit {
  lecturers: any[] = [];
  newLecturer = { username: '', password: '', role: 'lecturer' }; // Adjust according to your data model

  constructor(private lecturerService: LecturerService) {}

  ngOnInit() {
    this.loadLecturers();
  }

  loadLecturers() {
    this.lecturerService.getAllLecturers().subscribe((data) => {
      this.lecturers = data;
    });
  }

  addLecturer() {
    this.lecturerService.addLecturer(this.newLecturer).subscribe(() => {
      this.loadLecturers();
      this.newLecturer = { username: '', password: '', role: 'lecturer' }; // Reset form
    });
  }

  deleteLecturer(id: string) {
    this.lecturerService.deleteLecturer(id).subscribe(() => {
      this.loadLecturers();
    });
  }

  // Additional methods for editing can be added here
}
