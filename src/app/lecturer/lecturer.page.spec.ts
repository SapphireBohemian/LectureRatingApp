import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LecturerPage } from './lecturer.page';

describe('LecturerPage', () => {
  let component: LecturerPage;
  let fixture: ComponentFixture<LecturerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
