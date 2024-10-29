import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingsGraphPage } from './ratings-graph.page';

describe('RatingsGraphPage', () => {
  let component: RatingsGraphPage;
  let fixture: ComponentFixture<RatingsGraphPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsGraphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
