import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeCategoriasComponent } from './listado-de-categorias.component';

describe('ListadoDeCategoriasComponent', () => {
  let component: ListadoDeCategoriasComponent;
  let fixture: ComponentFixture<ListadoDeCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoDeCategoriasComponent]
    });
    fixture = TestBed.createComponent(ListadoDeCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
