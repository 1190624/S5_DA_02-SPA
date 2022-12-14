import { Component, OnInit } from '@angular/core';
import { EntregaService } from "src/app/services/entrega/entrega.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Entrega } from '../dto/entrega';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-criar-entrega',
  templateUrl: './criar-entrega.component.html',
  styleUrls: ['./criar-entrega.component.css']
})
export class CriarEntregaComponent implements OnInit {
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
  }

  Submit(): void{

    const IDENTIFICADOR_REGEX = new RegExp(/^[0-9]{6}$/);
    const ARMAZEMID_REGEX = new RegExp(/^([A-Z]|[0-9]){3}$/);
    const DIA_REGEX = new RegExp(/^([1-9]|[12][0-9]|3[01])$/);
    const MES_REGEX = new RegExp(/^([1-9]|1[0-2])$/);
    const ANO_REGEX = new RegExp(/^(20[0-9]{2})$/);
    
    if(!IDENTIFICADOR_REGEX.test(this.identificador)){
      alert("O Identificador da Entrega deve ser composto por 6 caratéres numéricos!");
    }
    else if(!ARMAZEMID_REGEX.test(this.armazemID)){
      alert("O Identificador do Armazém deve ser composto por 3 caratéres alfanuméricos!");
    }
    else if(!DIA_REGEX.test(this.dia.toString())){
      alert("O Identificador do Dia da Entrega deve ser composto por um valor válido!");
    }
    else if(!MES_REGEX.test(this.mes.toString())){
      alert("Identificador do Mês da Entrega deve ser composto por um valor válido!");
    }
    else if(!ANO_REGEX.test(this.ano.toString())){
      alert("Identificador do Ano da Entrega deve ser composto por um valor válido!");
    }
    else if(this.massa < 0 || this.massa == null){
      alert("O Valor da Massa é inválido!");
    }
    else if(this.tempoColocacao < 0 || this.tempoColocacao == null){
      alert("O Valor do Tempo de Colocação é inválido!");
    }
    else if(this.tempoRetirada < 0 || this.tempoRetirada == null){
      alert("O Valor do Tempo de Retirada é inválido!");
    }
    else{
      this.entrega = new Entrega(this.identificador, this.armazemID, this.dia, this.mes, this.ano, this.massa, this.tempoColocacao, this.tempoRetirada);
      this.service.criarEntrega(this.identificador, this.armazemID, this.dia, this.mes, this.ano, this.massa, this.tempoColocacao, this.tempoRetirada).subscribe(data => { alert("A Entrega foi criada.") });
    }
  }

  Return(): void{
    this.router.navigate(['/appRoot']);
  }

}
