import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCategoriaComponent } from './agregar-categoria.component';

describe('AgregarCategoriaComponent', () => {
  let component: AgregarCategoriaComponent;
  let fixture: ComponentFixture<AgregarCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarCategoriaComponent]
    });
    fixture = TestBed.createComponent(AgregarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
