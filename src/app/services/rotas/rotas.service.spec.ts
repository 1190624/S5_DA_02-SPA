import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RotasService } from './rotas.service';
import { IrotaDTO } from 'src/app/dto/IrotaDTO';

describe('RotasService', () => {
  let service: RotasService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        RotasService
        //HttpErrorHandler
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(RotasService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#criarRota', () => {

    it('deve criar uma Rota e retorná-la', () => {

      const r: IrotaDTO = {
        //name: "n1",
        //birthdate: "2020-12-30",
        //driverLicenseNum: 12345,
        //licenseExpiration: "2020-12-30"
        rotaId: 333333,
        origem: "Matosinhos",
        destino:"Porto",
        distancia: 900,
        tempo:"32",
        gastoEnergetico: 20,
        tempoCargaExtra:"10:10"
      };

      service.criarRota(r).subscribe(
        data => expect(data).toEqual(r, 'deveria retornar uma rota'),
        fail
      );

      // pathService should have made one request to POST path
      const req = httpTestingController.expectOne(service.url);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(r);

      // Expect server to return the path after POST
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: r });
      req.event(expectedResponse);
    });
  });


});
