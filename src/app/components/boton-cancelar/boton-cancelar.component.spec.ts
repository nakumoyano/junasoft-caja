import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonCancelarComponent } from './boton-cancelar.component';

describe('BotonCancelarComponent', () => {
  let component: BotonCancelarComponent;
  let fixture: ComponentFixture<BotonCancelarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotonCancelarComponent]
    });
    fixture = TestBed.createComponent(BotonCancelarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
