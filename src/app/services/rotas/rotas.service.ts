import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IrotaDTO } from 'src/app/dto/IrotaDTO';


@Injectable({
  providedIn: 'root'
})
export class RotasService {

  private url = 'https://s5da02-logistica-production.up.railway.app/api/rota';
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


}
