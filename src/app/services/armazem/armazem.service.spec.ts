import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ArmazemService } from './armazem.service';
import { Armazem } from 'src/app/dto/armazem';

describe('ArmazemService', () => {
  let service: ArmazemService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ArmazemService
        //HttpErrorHandler
      ]
    });
    service = TestBed.inject(ArmazemService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#criarArmazem', () => {
    it('deve criar um Armazém e retorná-lo', () => {

      const a: Armazem = {
        identificador: "A10",
        designacao: "Armazém 10",
        codigoPostal: "2100-100",
        numeroPorta: 100,
        nomeRua: "Rua do Porto",
        localidade: "Porto",
        pais: "Portugal",
        municipio: "Paranhos",
        latitude: 20.10,
        longitude: 20.10
      };

      service.criarArmazem(a.identificador, a.designacao, a.codigoPostal,
        a.numeroPorta, a.nomeRua, a.localidade, a.pais, a.municipio,
        a.latitude, a.longitude).subscribe(data => expect(data)
          .toEqual(a, 'deve retornar o Armazém'), fail);


      // pathService should have made one request to POST path
      const req = httpTestingController.expectOne(service.url);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(a);

      // Expect server to return the path after POST
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: a });
      req.event(expectedResponse);
    })
  })
});
