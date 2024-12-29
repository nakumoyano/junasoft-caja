import { TestBed } from '@angular/core/testing';

import { TiposMovimientosService } from './tipos-movimientos.service';

describe('TiposMovimientosService', () => {
  let service: TiposMovimientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposMovimientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
