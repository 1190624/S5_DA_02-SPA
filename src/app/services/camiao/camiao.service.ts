import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Camiao } from '../../dto/camiao';

@Injectable({
  providedIn: 'root'
})
export class CamiaoService {
  public url = 'https://s5da02-logistica-production.up.railway.app/api/camiao';
  constructor(private httpClient: HttpClient) { }


  criarCamiao(matricula: string, caracteristica: string, autonomia: number, capacidadeTransporte: number, capacidadeBateria: number,
    tara: number, tempoCarregamento: string): Observable<any> {

    //this.verificarAtributos(matricula, caracteristica, autonomia, capacidadeTransporte, capacidadeBateria,tara, tempoCarregamento);
    const body = {
      "matricula": matricula, "caracteristica": caracteristica,
      "autonomia": autonomia, "capacidadeTransporte": capacidadeTransporte, "capacidadeBateria": capacidadeBateria, "tara": tara, "tempoCarregamento": tempoCarregamento
    }

    console.log(body);
    return this.httpClient.post(this.url, body).pipe(catchError(err => {
      if (err.status == 400) {
        alert('Camião inválido!');
      }
      if (err.status == 500) {
        alert('Camião inválido:\nPoderá já existir um camião com a matrícula introduzida!');
      }
      return throwError(err);
    }));
  }



  /*
    atualizarCamio(matricula: string, caracteristica: string, autonomia:number, capacidadeTransporte:number, capacidadeBateria:number,
      tara: number, tempoCarregamento:string): Observable<any>{
  
      this.verificarAtributos(matricula, caracteristica, autonomia, capacidadeTransporte, capacidadeBateria,tara, tempoCarregamento);
      
      const body = {"matricula":matricula,"caracteristica":caracteristica,
      "autonomia":autonomia, "capacidadeTransporte":capacidadeTransporte, "capacidadeBateria":capacidadeBateria, "tara": tara, "tempoCarregamento":tempoCarregamento}
      
      console.log(body);
      return this.httpClient.put(this.url, body).pipe(map(this.extractData));
    }
  */


  getCamioes(): Observable<any> {
    return this.httpClient.get(this.url).pipe(map(this.extractData));
  }

  listaCamioes(): void {

    let tbody = document.getElementById('tbody') as HTMLTableElement;
    let array = this.getCamioes();

    array.forEach(function (i) {
      for (let j = 0; j < i.length; j++) {
        let tr = tbody.insertRow();

        let td_matricula = tr.insertCell();
        let td_caracteristica = tr.insertCell();
        let td_autonomia = tr.insertCell();
        let td_capacidadeTransporte = tr.insertCell();
        let td_capacidadeBateria = tr.insertCell();
        let td_tara = tr.insertCell();
        let td_tempoCarregamento = tr.insertCell();

        td_matricula.innerText = i[j].matricula;
        td_caracteristica.innerText = i[j].caracteristica;
        td_autonomia.innerText = i[j].autonomia;
        td_capacidadeTransporte.innerText = i[j].capacidadeTransporte;
        td_capacidadeBateria.innerText = i[j].capacidadeBateria;
        td_tara.innerText = i[j].tara;
        td_tempoCarregamento.innerText = i[j].tempoCarregamento;
      }
    });
  }

  getCamiao(matricula: string): Observable<any> {
    return this.httpClient.get(this.url + '/:matricula' + matricula).pipe(
      map(this.extractData));
  }




  verificarAtributos(matricula: string, caracteristica: string, autonomia: number, capacidadeTransporte: number, capacidadeBateria: number,
    tara: number, tempoCarregamento: string): void {



  }



  public extractData(res: any) {
    return res || {};
  }

}
