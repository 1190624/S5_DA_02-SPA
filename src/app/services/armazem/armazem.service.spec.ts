import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ArmazemService } from './armazem.service';

describe('ArmazemService', () => {
  let service: ArmazemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        ArmazemService
        //HttpErrorHandler
      ]
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmazemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
