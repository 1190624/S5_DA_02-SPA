import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Armazem } from 'src/app/dto/armazem';
import { catchError, map, Observable, throwError } from 'rxjs';
import { urlGestaoArmazens } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ArmazemService {

  public url = urlGestaoArmazens + 'armazem';
  constructor(private httpClient: HttpClient) { }


  criarArmazem(identificador: string, designacao: string, codigoPostal: string, numeroPorta: number, nomeRua: string, localidade: string,
    pais: string, municipio: string, latitude: number, longitude: number, altitude: number): Observable<any> {

    const body = {
      "identificador": identificador, "designacao": designacao, "codigoPostal": codigoPostal, "numeroPorta": numeroPorta,
      "nomeRua": nomeRua, "localidade": localidade, "pais": pais, "municipio": municipio, "latitude": latitude, "longitude": longitude,
      "altitude": altitude
    }
    console.log(body);

    return this.httpClient.post(this.url, body).pipe(catchError(err => {
      if (err.status == 400) {
        alert('Armazém não criado!');
      }
      if (err.status == 500) {
        alert('Armazém inválido:\nPoderá já existir um armazém com o ID introduzido!');
      }
      return throwError(err);
    }));

  }

  getArmazens(): Observable<any> {
    return this.httpClient.get(this.url).pipe(map(this.extractData));
  }

  mudarEstado(id: string): Observable<any> {
    return this.httpClient.put(this.url + "/desativar/" + id, null).pipe(map(this.extractData));
  }

  public extractData(res: any) {
    return res || {};
  }
}
