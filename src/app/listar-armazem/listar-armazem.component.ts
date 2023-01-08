import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Armazem } from '../dto/armazem';
import { ArmazemService } from '../services/armazem/armazem.service';

@Component({
  selector: 'app-listar-armazem',
  templateUrl: './listar-armazem.component.html',
  styleUrls: ['./listar-armazem.component.css']
})
export class ListarArmazemComponent implements OnInit {
  pesquisaIdentificador: string;
  pesquisaDesignacao: string;
  pesquisaCodigoPostal: string;
  pesquisaNumeroPorta: string;
  pesquisaNomeRua: string;
  pesquisaLocalidade: string;
  pesquisaPais: string;
  pesquisaMunicipo: string;
  pesquisaLatitude: string;
  pesquisaLongitude: string;
  pesquisaAltitude: string;
  pesquisaEstado: string;

  armazens: Armazem[];

  armazem: Armazem;
  identificador: string;
  designacao: string;
  codigoPostal: string;
  numeroPorta: number;
  nomeRua: string;
  localidade: string;
  pais: string;
  municipio: string;
  latitude: number;
  longitude: number;
  altitude: number;
  estado: boolean;

  constructor(private service: ArmazemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getArmazens();
  }

  public getArmazens(): void {

    this.service.getArmazens().subscribe(data => {
      this.armazens = data;
    });
  }

  mudarEstado(id: string): void {
    this.service.mudarEstado(id).subscribe(data => { alert("O estado do camião foi atualizado.") });
  }
}
