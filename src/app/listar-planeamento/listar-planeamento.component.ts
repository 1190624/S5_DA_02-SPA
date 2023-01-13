import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Planeamento } from '../dto/planeamento';
import { PlaneamentoService } from '../services/planeamento/planeamento.service';

@Component({
  selector: 'app-listar-planeamento',
  templateUrl: './listar-planeamento.component.html',
  styleUrls: ['./listar-planeamento.component.css']
})
export class ListarPlaneamentoComponent implements OnInit {
  pesquisaMatricula: string;
  pesquisaData: string;
  pesquisaArmazens: string;

  planeamentos: Planeamento[];

  constructor(private service: PlaneamentoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  public getPlaneamentos(): void {

    this.service.getPlaneamentos().subscribe(data => {
      this.planeamentos = data;
    });
  }
}
