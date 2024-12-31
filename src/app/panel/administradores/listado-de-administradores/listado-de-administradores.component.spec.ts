import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeAdministradoresComponent } from './listado-de-administradores.component';

describe('ListadoDeAdministradoresComponent', () => {
  let component: ListadoDeAdministradoresComponent;
  let fixture: ComponentFixture<ListadoDeAdministradoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoDeAdministradoresComponent]
    });
    fixture = TestBed.createComponent(ListadoDeAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
