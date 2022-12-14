import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { Armazem } from 'src/app/dto/armazem';
import {catchError, map, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArmazemService {

  private url = 'https://localhost:5001/api/armazem';
  constructor(private httpClient: HttpClient) { }


  criarArmazem(identificador: string, designacao: string, codigoPostal: string, numeroPorta: number, nomeRua: string, localidade: string,
    pais: string, municipio: string, latitude: number,longitude: number): Observable<any>{

    const body = {"Identificador":identificador, "Designação":designacao, "CódigoPostal":codigoPostal, "NúmeroPorta":numeroPorta,
    "NomeRua":nomeRua, "Localidade":localidade, "País":pais, "Munícipio":municipio, "Latitude":latitude, "Longitude": longitude}
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

  listaArmazens(): void {

    let tbody = document.getElementById('tbody') as HTMLTableElement;
    let array = this.getArmazens();

    array.forEach(function (i) {
      for (let j = 0; j < i.length; j++) {
        let tr = tbody.insertRow();

        let td_identificador = tr.insertCell();
        let td_designacao = tr.insertCell();
        let td_codigoPostal = tr.insertCell();
        let td_numeroPorta = tr.insertCell();
        let td_nomeRua= tr.insertCell();
        let td_localidade = tr.insertCell();
        let td_pais = tr.insertCell();
        let td_municipio = tr.insertCell();
        let td_latitude = tr.insertCell();
        let td_longitude = tr.insertCell();

        td_identificador.innerText = i[j].Identificador;
        td_designacao.innerText = i[j].Designação;
        td_codigoPostal.innerText = i[j].CódigoPostal;
        td_numeroPorta.innerText = i[j].NúmeroPorta;
        td_nomeRua.innerText = i[j].NomeRua;
        td_localidade.innerText = i[j].Localidade;
        td_pais.innerText = i[j].País;
        td_municipio.innerText = i[j].Munícipio;
        td_latitude.innerText = i[j].Latitude;
        td_longitude.innerText = i[j].Longitude;
      }
    });
  }

  public extractData(res:any){
    return res || {};
  }
}
