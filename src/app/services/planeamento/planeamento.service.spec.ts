import { TestBed } from '@angular/core/testing';

import { PlaneamentoService } from './planeamento.service';

describe('PlaneamentoService', () => {
  let service: PlaneamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaneamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
