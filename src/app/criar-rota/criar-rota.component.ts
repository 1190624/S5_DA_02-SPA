import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IrotaDTO } from '../dto/IrotaDTO';
import { RotasService } from '../services/rotas/rotas.service';

@Component({
  selector: 'app-criar-rota',
  templateUrl: './criar-rota.component.html',
  styleUrls: ['./criar-rota.component.css']
})
export class CriarRotaComponent implements OnInit {
  rotaDTO: IrotaDTO={
    rotaId:0,origem:'',
    destino:'',distancia:0,
    tempo:'',gastoEnergetico:0,
    tempoCargaExtra:''
  };
  rotaId: number;
  rotaOrigem: string;
  rotaDestino: string;
  rotaDistancia: number;
  rotaTempo: string;
  rotaGastoEnergetico: number;
  rotaTempoCargaExtra: string;

  constructor(private service: RotasService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  Submit(): void {
    
    const DISTANCIA_MIN = 0;
    const TEMPO_REGEX = new RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
    const GASTO_MINIMO = 0;
    const TEMPO_CARGA_EXTRA = new RegExp(/^([0-5][0-9])$/);

    if (this.rotaDistancia <= DISTANCIA_MIN)
      alert("A Distância entre os Armazéns indicados deve ser superior a " + DISTANCIA_MIN + ";");
    if (!TEMPO_REGEX.test(this.rotaTempo))
      alert("O Formato do Tempo indicado é inválido;");
    if (this.rotaGastoEnergetico <= GASTO_MINIMO)
      alert("O Gasto Minímo deve ser superior a " + GASTO_MINIMO + ";");
    if (!TEMPO_CARGA_EXTRA.test(this.rotaTempoCargaExtra))
      alert("O Formato do Tempo de Carga Extra é inválido;");
      
      this.wrapDTO();

      this.service.criarRota(this.rotaDTO).subscribe(data => { alert("A rota foi criada.") });

  }
  
  private wrapDTO():void{
    this.rotaDTO.rotaId=this.rotaId;
    this.rotaDTO.origem=this.rotaOrigem;
    this.rotaDTO.destino=this.rotaDestino;
    this.rotaDTO.distancia=this.rotaDistancia;
    this.rotaDTO.tempo=this.rotaTempo;
    this.rotaDTO.gastoEnergetico=this.rotaGastoEnergetico;
    this.rotaDTO.tempoCargaExtra=this.rotaTempoCargaExtra;
  }

}
