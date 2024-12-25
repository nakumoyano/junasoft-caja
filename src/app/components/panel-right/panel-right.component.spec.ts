import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRightComponent } from './panel-right.component';

describe('PanelRightComponent', () => {
  let component: PanelRightComponent;
  let fixture: ComponentFixture<PanelRightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelRightComponent]
    });
    fixture = TestBed.createComponent(PanelRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
