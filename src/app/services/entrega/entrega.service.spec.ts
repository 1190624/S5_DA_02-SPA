import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EntregaService } from './entrega.service';
import { Entrega } from 'src/app/dto/entrega';

describe('EntregaService', () => {
  let service: EntregaService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        EntregaService
        //HttpErrorHandler
      ]
    });
    service = TestBed.inject(EntregaService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#criarEntrega', () => {
    it('deve criar uma Entrega e retorná-lo', () => {

      const a: Entrega = {
        identificador: "443923",
        armazemID: "T12",
        dia: 5,
        mes: 12,
        ano: 2022,
        massa: 600,
        tempoColocacao: 25,
        tempoRetirada: 15
      };

      service.criarEntrega(a.identificador, a.armazemID, a.dia,
        a.mes, a.ano, a.massa, a.tempoColocacao,
        a.tempoRetirada).subscribe(data => expect(data)
          .toEqual(a, 'deve retornar a Entrega'), fail);


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
