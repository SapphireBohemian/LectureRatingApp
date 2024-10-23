import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackListPage } from './feedback-list.page';

describe('FeedbackListPage', () => {
  let component: FeedbackListPage;
  let fixture: ComponentFixture<FeedbackListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
