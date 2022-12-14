import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { urlLogisitica } from 'src/app/config';
import { IrotaDTO } from 'src/app/dto/IrotaDTO';


@Injectable({
  providedIn: 'root'
})
export class RotasService {

  public url = urlLogisitica + 'rota';
  constructor(private httpClient: HttpClient) {
  }

  criarRota(rota: IrotaDTO):Observable<any>{
    return this.httpClient.post(this.url,rota).pipe(catchError(err => {
      if (err.status == 400) {
        alert('Rota não criada!');
      }
      if (err.status == 500) {
        alert('Rota inválida:\nPoderá já existir uma rota com o ID introduzido!');
      }
      return throwError(err);
    }));
  }

  getRotas(): Observable<any> {
    return this.httpClient.get(this.url).pipe(map(this.extractData));
  }

  public extractData(res: any) {
    return res || {};
  }

}
