import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EntregaService {
  private url = 'https://localhost:5001/api/Entrega';
  constructor(private httpClient: HttpClient) { }

  criarEntrega(identificador: string,
    armazemID: string,
    dia:number,
    mes:number,
    ano:number,
    massa: number,
    tempoColocacao: number,
    tempoRetirada: number): Observable<any> {


      const body = {"Identificador": identificador, "Armazém": armazemID, "Dia": dia, "Mes": mes, "Ano": ano, "Massa":massa,"TempoColocação":tempoColocacao, "TempoRetirada":tempoRetirada}
      console.log(body);
      return this.httpClient.post(this.url, body).pipe(catchError(err => {
        if (err.status == 400) {
          alert('Entrega inválida:\nPoderá já existir uma entrega com o ID introduzido!');
        }
        if (err.status == 500) {
          alert('Entrega inválida:\nPoderá já existir um armazém com o ID introduzido!');
        }
        return throwError(err);
      }));
    }

    getEntregas(): Observable<any> {
      return this.httpClient.get(this.url).pipe(map(this.extractData));
    }
  
    listaEntregas(): void {
  
      let tbody = document.getElementById('tbody') as HTMLTableElement;
      let array = this.getEntregas();
  
      array.forEach(function (i) {
        for (let j = 0; j < i.length; j++) {
          let tr = tbody.insertRow();
  
          let td_identificador = tr.insertCell();
          let td_armazem = tr.insertCell();
          let td_dia= tr.insertCell();
          let td_mes = tr.insertCell();
          let td_ano = tr.insertCell();
          let td_massa = tr.insertCell();
          let td_tempoColocacao = tr.insertCell();
          let td_tempoRetirada = tr.insertCell();
  
          td_identificador.innerText = i[j].Identificador;
          td_armazem.innerText = i[j].ArmazémId;
          td_dia.innerText = i[j].Dia;
          td_mes.innerText = i[j].Mes;
          td_ano.innerText = i[j].Ano;
          td_massa.innerText = i[j].Massa;
          td_tempoColocacao.innerText = i[j].TempoColocação;
          td_tempoRetirada.innerText = i[j].TempoRetirada;
        }
      });
    }

    public extractData(res: any) {
      return res || {};
    }



}
