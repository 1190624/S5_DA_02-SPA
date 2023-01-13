import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaneamentoService {

  public url = "http://localhost:2311/api/planeamento";

  constructor(private httpClient: HttpClient) { }

  criarPlaneamento(heuristica: string, matricula: string, data: string): Observable<any> {

    const body = {
      "Heuristica": heuristica, "Matricula": matricula, "Data": data
    }
    console.log(body);

    return this.httpClient.post(this.url, body).pipe(catchError(err => {
      if (err.status == 400) {
        alert('Planeamento não criado!');
      }
      if (err.status == 500) {
        alert('Planeamento inválido!');
      }
      return throwError(err);
    }));

  }

  getPlaneamentos(): Observable<any> {
    return this.httpClient.get(this.url).pipe(map(this.extractData));
  }

  public extractData(res: any) {
    return res || {};
  }
}
