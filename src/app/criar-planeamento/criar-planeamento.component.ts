import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Planeamento } from '../dto/planeamento';
import { PlaneamentoService } from '../services/planeamento/planeamento.service';

@Component({
  selector: 'app-criar-planeamento',
  templateUrl: './criar-planeamento.component.html',
  styleUrls: ['./criar-planeamento.component.css']
})
export class CriarPlaneamentoComponent implements OnInit {
  planeamento: Planeamento;
  heuristica: string;
  matricula: string;
  data: string;
  armazens: string;

  constructor(private service : PlaneamentoService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }

  Submit(): void{

    //const MATRICULA_REGEX = new RegExp(/^[A-Z]{2}-[0-9]{2}-[A-Z]{2}$/);
    
    if (!this.matricula == null) {
      alert("Matrícula não é válida!");    
    }
    else if(!this.data == null){
      alert("A data é inválida!");
    }
    else if(!this.heuristica == null){
      alert("O Heurística é inválida!");
    }
    else{
      this.service.criarPlaneamento(this.heuristica, this.matricula, this.data)
      .subscribe(data => { alert("O Planeamento foi criada.") });
    }
  }

  Return(): void{
    this.router.navigate(['/appRoot']);
  }
}
