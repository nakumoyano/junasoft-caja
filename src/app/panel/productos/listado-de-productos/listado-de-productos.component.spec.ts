import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeProductosComponent } from './listado-de-productos.component';

describe('ListadoDeProductosComponent', () => {
  let component: ListadoDeProductosComponent;
  let fixture: ComponentFixture<ListadoDeProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoDeProductosComponent]
    });
    fixture = TestBed.createComponent(ListadoDeProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
