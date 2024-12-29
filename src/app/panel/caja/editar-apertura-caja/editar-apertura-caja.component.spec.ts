import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAperturaCajaComponent } from './editar-apertura-caja.component';

describe('EditarAperturaCajaComponent', () => {
  let component: EditarAperturaCajaComponent;
  let fixture: ComponentFixture<EditarAperturaCajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAperturaCajaComponent]
    });
    fixture = TestBed.createComponent(EditarAperturaCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
