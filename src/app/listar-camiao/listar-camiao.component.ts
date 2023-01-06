import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camiao } from '../dto/camiao';
import { CamiaoService } from '../services/camiao/camiao.service';

@Component({
  selector: 'app-listar-camiao',
  templateUrl: './listar-camiao.component.html',
  styleUrls: ['./listar-camiao.component.css']
})
export class ListarCamiaoComponent implements OnInit {
  pesquisaMatricula: string;
  pesquisaCaracteristica: string;
  pesquisaAutonomia: string;
  pesquisaCapacidadeTransporte: string;
  pesquisaCapacidadeBateria: string;
  pesquisaTara: string;
  pesquisaTempoCarregamento: string;
  pesquisaAtivo: string;

  camioes: Camiao [];

  camiao: Camiao;
  matricula: string;
  caracteristica: string;
  autonomia: number;
  capacidadeTransporte: number;
  capacidadeBateria: number;
  tara: number;
  tempoCarregamento: string;
  ativo:boolean;

  constructor(private service: CamiaoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCamioes();
  }

  public getCamioes(): void {

    this.service.getCamioes().subscribe(data => {
      this.camioes = data;
    });
  }



  mudarEstado(matricula:string): void{
    this.service.mudarEstado(matricula).subscribe(data => { alert("O estado do camião foi atualizado.") });
  }
}
