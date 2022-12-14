import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
//import { HttpErrorHandler } from '../../http-error-handler.service';

import { CamiaoService } from './camiao.service';
import { Camiao } from 'src/app/dto/camiao';

describe('CamiaoService', () => {
  let service: CamiaoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        CamiaoService
        //HttpErrorHandler
      ]
    });
    service = TestBed.inject(CamiaoService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  describe('#criarCamiao', () => {

    it('deve criar um Camião e retorná-lo', () => {

      const c: Camiao = {
        //name: "n1",
        //birthdate: "2020-12-30",
        //driverLicenseNum: 12345,
        //licenseExpiration: "2020-12-30"
        matricula: "DD-06-FF",
        caracteristica: "Camiao26",
        autonomia:100,
        capacidadeTransporte:900,
        capacidadeBateria:60,
        tara: 2000,
        tempoCarregamento:"10:10"
      };

      service.criarCamiao(c.matricula,c.caracteristica, c.autonomia, c.capacidadeTransporte,
      c.capacidadeBateria, c.tara, c.tempoCarregamento).subscribe(
        data => expect(data).toEqual(c, 'should return the Driver'),
        fail
      );

      // pathService should have made one request to POST path
      const req = httpTestingController.expectOne(service.url);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(c);

      // Expect server to return the path after POST
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: c });
      req.event(expectedResponse);
    });
  });


});
