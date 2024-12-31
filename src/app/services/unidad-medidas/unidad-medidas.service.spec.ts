import { TestBed } from '@angular/core/testing';

import { UnidadMedidasService } from './unidad-medidas.service';

describe('UnidadMedidasService', () => {
  let service: UnidadMedidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadMedidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
