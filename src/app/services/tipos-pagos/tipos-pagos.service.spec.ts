import { TestBed } from '@angular/core/testing';

import { TiposPagosService } from './tipos-pagos.service';

describe('TiposPagosService', () => {
  let service: TiposPagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposPagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
