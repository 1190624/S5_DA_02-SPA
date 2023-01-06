import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IrotaDTO } from '../dto/IrotaDTO';
import { RotasService } from '../services/rotas/rotas.service';

@Component({
  selector: 'app-listar-rota',
  templateUrl: './listar-rota.component.html',
  styleUrls: ['./listar-rota.component.css']
})
export class ListarRotaComponent implements OnInit {

  pesquisaRotaId: string;
  pesquisaOrigem: string;
  pesquisaDestino: string;
  pesquisaDistancia: string;
  pesquisaTempo: string;
  pesquisaGastoEnergetico: string;
  pesquisaTempoCargaExtra: string;

  rotas : IrotaDTO[];
  rotaId: number;
  origem: string;
  destino: string;
  distancia: number;
  tempo: string;
  gastoEnergetico: number;
  tempoCargaExtra: string;

  tamanhoLista: number = 10;
  numeroPagina: number = 1;

  constructor(private service: RotasService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.getRotas();
  }


  public getRotas(): void {
    this.service.getRotas().subscribe(data => {
      this.rotas = data;
    });
  }
}
