import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Armazem } from '../dto/armazem';
import { ArmazemService } from '../services/armazem/armazem.service';

@Component({
  selector: 'app-criar-armazem',
  templateUrl: './criar-armazem.component.html',
  styleUrls: ['./criar-armazem.component.css']
})
export class CriarArmazemComponent implements OnInit {
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

  constructor(private service: ArmazemService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
  }

  Submit(): void {

    const ID_REGEX= new RegExp(/^([A-Z]|[0-9]){3}$/);
    const CODIGO_POSTAL_REGEX = new RegExp(/^[0-9]{4}-[0-9]{3}$/);

    if (!ID_REGEX.test(this.identificador)) {
      alert("O Identificador não é válido!\nFormato exemplo: A01");
    } else if (this.designacao == null) {
      alert("Necessário inserir uma Designação do Armazém!");
    } else if (!CODIGO_POSTAL_REGEX.test(this.codigoPostal)) {
      alert("O Código Postal não se apresenta no formato correto!\nFormato exemplo: 1000-100");
    } else if (this.numeroPorta < 0 || this.numeroPorta == null) {
      alert("O Número da Porta não é válido!");
    } else if (this.nomeRua == null) {
      alert("Necessário inserir uma Rua!");
    } else if (this.localidade == null) {
      alert("Necessário inserir uma Localidade!");
    } else if (this.pais == null) {
      alert("Necessário inserir um País!");
    } else if (this.municipio == null) {
      alert("Necessário inserir um Município!");
    } else if (this.latitude < -90 || this.latitude > 90 || this.latitude == null) {
      alert("A latitude não é válida!");
    } else if (this.longitude < -180 ||this.longitude > 180 || this.longitude == null) {
      alert("A longitude não é válida!");
    } else {

      this.armazem = new Armazem(this.identificador, this.designacao, this.codigoPostal, this.numeroPorta,
        this.nomeRua, this.localidade, this.pais, this.municipio, this.latitude, this.longitude);
      this.service.criarArmazem(this.identificador, this.designacao, this.codigoPostal, this.numeroPorta,
        this.nomeRua, this.localidade, this.pais, this.municipio, this.latitude, this.longitude).subscribe(data => { alert("O armazém foi criado.") });

    }
  }

  Return(): void {
    this.router.navigate(['/menuNav']);
  }
}