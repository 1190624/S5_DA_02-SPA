import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EntregaService } from './entrega.service';

describe('EntregaService', () => {
  let service: EntregaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        EntregaService
        //HttpErrorHandler
      ]
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
