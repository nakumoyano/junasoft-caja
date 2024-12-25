import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonGridComponent } from './skeleton-grid.component';

describe('SkeletonGridComponent', () => {
  let component: SkeletonGridComponent;
  let fixture: ComponentFixture<SkeletonGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonGridComponent]
    });
    fixture = TestBed.createComponent(SkeletonGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
