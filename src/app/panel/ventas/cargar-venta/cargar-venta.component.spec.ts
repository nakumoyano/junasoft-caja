import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarVentaComponent } from './cargar-venta.component';

describe('CargarVentaComponent', () => {
  let component: CargarVentaComponent;
  let fixture: ComponentFixture<CargarVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarVentaComponent]
    });
    fixture = TestBed.createComponent(CargarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
