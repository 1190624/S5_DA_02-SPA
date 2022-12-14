import { Component, OnInit } from '@angular/core';
import { CamiaoService } from "src/app/services/camiao/camiao.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Camiao } from '../dto/camiao';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-criar-camiao',
  templateUrl: './criar-camiao.component.html',
  styleUrls: ['./criar-camiao.component.css']
})
export class CriarCamiaoComponent implements OnInit {
  camiao: Camiao;
  matricula: string;
  caracteristica: string;
  autonomia: number;
  capacidadeTransporte: number;
  capacidadeBateria: number;
  tara: number;
  tempoCarregamento: string;



  constructor(private service: CamiaoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }



  Submit(): void {


    const MATRICULA_REGEX = new RegExp(/^[A-Z]{2}-[0-9]{2}-[A-Z]{2}$/);
    //verificar se os valores do camião estão corretos.    
    if (!MATRICULA_REGEX.test(this.matricula)) {
      alert("Matrícula não é válida!\nFormato exemplo = AA-00-ZZ");    
    } else if (this.caracteristica == null) {
      alert("Necessário inserir uma Característica!");
    } else if (this.autonomia < 90 || this.autonomia == null) {
      alert("Automia não é válida!\nValor Mínimo = 90");    
    } else if (this.capacidadeTransporte < 800 || this.capacidadeTransporte == null) {
      alert("Capacidade de Transporte não é válida!\nValor Mínimo = 800");
    } else if (this.capacidadeBateria < 55 || this.capacidadeBateria == null) {
      alert("Capacidade de Bateria não é válida!\nValor Mínimo = 55");
    } else if (this.tara < 1000 || this.tara == null) {
      alert("Tara não é válida!\nValor Mínimo = 1000");
    } else if (this.tempoCarregamento == null){
      alert("Tempo de Carregamento não é válido")

    } else {

      this.camiao = new Camiao(this.matricula, this.caracteristica, this.autonomia, this.capacidadeTransporte,
        this.capacidadeBateria, this.tara, this.tempoCarregamento);
      this.service.criarCamiao(this.matricula, this.caracteristica, this.autonomia, this.capacidadeTransporte,
        this.capacidadeBateria, this.tara, this.tempoCarregamento).subscribe(data => { alert("O camião foi criado.") });
    }



  }



  Return(): void {
    this.router.navigate(['/appRoot']);
  }
}




/*
//Get inputs from the boxes
var matricula = document.getElementById('matricula') as HTMLInputElement; 
var caracteristica = document.getElementById('caracteristica') as HTMLInputElement;
var autonomia = document.getElementById('autonomia') as HTMLInputElement;
var capacidadeTransporte= document.getElementById('autonomia') as HTMLInputElement;
var capacidadeBateria= document.getElementById('capacidadeTransporte') as HTMLInputElement;
var tara= document.getElementById('tara') as HTMLInputElement;
var tempoCarregamento= document.getElementById('tempoCarregamento') as HTMLInputElement;
 
/*           this.service.criarCamiao(this.formBuilder.group({
  matricula:matricula.value, 
  caracteristica: caracteristica.value,
  autonomia:autonomia.value,
  capacidadeTransporte:capacidadeTransporte.value,
  capacidadeBateria: capacidadeBateria.value,
  tara:tara.value,
  tempoCarregamento: tempoCarregamento.value
}).value).subscribe(data => { alert("O camião foi criado.") });
 
/*
matricula.value='';
caracteristica.value='';
autonomia.valueAsNumber=0;
capacidadeTransporte.valueAsNumber=0; 
capacidadeBateria.valueAsNumber=0;
tara.valueAsNumber=0;
tempoCarregamento.value='';
*/ 