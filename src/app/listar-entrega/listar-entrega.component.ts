import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entrega } from '../dto/entrega';
import { EntregaService } from '../services/entrega/entrega.service';

@Component({
  selector: 'app-listar-entrega',
  templateUrl: './listar-entrega.component.html',
  styleUrls: ['./listar-entrega.component.css']
})
export class ListarEntregaComponent implements OnInit { 
  pesquisaIdentificador: string;
  pesquisaArmazemID: string;
  pesquisaDia: string;
  pesquisaMes: string;
  pesquisaAno: string;
  pesquisaMassa: string;
  pesquisaTempoColocacao: string;
  pesquisaTempoRetirada: string;

  entregas: Entrega[]; 
  
  
  entrega: Entrega;
  identificador: string;
  armazemID: string;
  dia:number;
  mes:number;
  ano:number;
  massa: number;
  tempoColocacao: number;
  tempoRetirada: number;

  constructor(private service : EntregaService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getEntregas();
  }

  public getEntregas(): void {

    this.service.getEntregas().subscribe(data => {
      this.entregas = data;
    });
  }

}