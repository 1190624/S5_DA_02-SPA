import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
})

@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any[], domainType: string, params: any): any[] {

    if (!items) {
      return [];
    }

    let finalList = JSON.parse(JSON.stringify(items)) as any[];

    if (domainType === "entrega") {

      if (!params.Identificador && !params.ArmazemId && !params.Dia && !params.Mes && !params.Ano &&
        !params.Massa && !params.TempoColocacao && !params.TempoRetirada) {
        return items
      }

      if (params.Identificador) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Identificador'].toString().includes(params.Identificador.toLowerCase())
        );
      }

      if (params.ArmazemId) {
        finalList = finalList.filter((singleItem) =>
          singleItem['ArmazemId'].toLowerCase().includes(params.ArmazemId.toLowerCase())
        );
      }

      if (params.Dia) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Dia'].toLowerCase().includes(params.Dia.toLowerCase())
        );
      }
      if (params.Mes) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Mes'].toString().includes(params.Mes.toLowerCase())
        );
      }
      if (params.Ano) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Ano'].toString().includes(params.Ano.toLowerCase())
        );
      }

      if (params.Massa) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Massa'].toString().includes(params.Massa.toLowerCase())
        );
      }

      if (params.TempoColocacao) {
        finalList = finalList.filter((singleItem) =>
          singleItem['TempoColocacao'].toString().includes(params.TempoColocacao.toLowerCase())
        );
      }

      if (params.TempoRetirada) {
        finalList = finalList.filter((singleItem) =>
          singleItem['TempoRetirada'].toString().includes(params.TempoRetirada.toLowerCase())
        );
      }
      

    } else if (domainType === "rota") {

      if (!params.rotaId && !params.origem && !params.destino && !params.distancia && !params.tempo && !params.gastoEnergetico && !params.tempoCargaExtra) {
        return items;
      }

      if (params.rotaId) {
        finalList = finalList.filter((singleItem) =>
          singleItem['rotaId'].toLowerCase().includes(params.rotaId.toLowerCase())
        );
      }

      if (params.origem) {
        finalList = finalList.filter((singleItem) =>
          singleItem['origem'].toString().toLowerCase().includes(params.origem.toLowerCase())
        );
      }

      if (params.destino) {
        finalList = finalList.filter((singleItem) =>
          singleItem['destino'].toString().toLowerCase().includes(params.destino.toLowerCase())
        );
      }

      if (params.distancia) {
        finalList = finalList.filter((singleItem) =>
          singleItem['distancia'].toString().toLowerCase().includes(params.distancia.toLowerCase())
        );
      }

      if (params.tempo) {
        finalList = finalList.filter((singleItem) =>
          singleItem['tempo'].toString().toLowerCase().includes(params.tempo.toLowerCase())
        );
      }

      if (params.gastoEnergetico) {
        finalList = finalList.filter((singleItem) =>
          singleItem['gastoEnergetico'].toString().toLowerCase().includes(params.gastoEnergetico.toLowerCase())
        );
      }
      if (params.tempoCargaExtra) {
        finalList = finalList.filter((singleItem) =>
          singleItem['tempoCargaExtra'].toString().toLowerCase().includes(params.tempoCargaExtra.toLowerCase())
        );
      }

    } else if (domainType === "camiao") {

      if (!params.matricula && !params.caracteristica && !params.autonomia && !params.capacidadeTransporte && !params.capacidadeBateria 
        && !params.tara && !params.tempoCarregamento && !params.ativo) {
        return items;
      }

      if (params.matricula) {
        finalList = finalList.filter((singleItem) =>
          singleItem['matricula'].toLowerCase().includes(params.matricula.toLowerCase())
        );
      }

      if (params.caracteristica) {
        finalList = finalList.filter((singleItem) =>
          singleItem['caracteristica'].toString().toLowerCase().includes(params.caracteristica.toLowerCase())
        );
      }

      if (params.autonomia) {
        finalList = finalList.filter((singleItem) =>
          singleItem['autonomia'].toString().toLowerCase().includes(params.autonomia.toLowerCase())
        );
      }

      if (params.capacidadeTransporte) {
        finalList = finalList.filter((singleItem) =>
          singleItem['capacidadeTransporte'].toString().toLowerCase().includes(params.capacidadeTransporte.toLowerCase())
        );
      }

      if (params.capacidadeBateria) {
        finalList = finalList.filter((singleItem) =>
          singleItem['capacidadeBateria'].toString().toLowerCase().includes(params.capacidadeBateria.toLowerCase())
        );
      }

      if (params.tara) {
        finalList = finalList.filter((singleItem) =>
          singleItem['tara'].toString().toLowerCase().includes(params.tara.toLowerCase())
        );
      }
      if (params.tempoCarregamento) {
        finalList = finalList.filter((singleItem) =>
          singleItem['tempoCarregamento'].toString().toLowerCase().includes(params.tempoCarregamento.toLowerCase())
        );
      }

      if (params.ativo) {
        finalList = finalList.filter((singleItem) =>
          singleItem['ativo'].toString().toLowerCase().includes(params.ativo.toLowerCase())
        );
      }

    } else if (domainType === "armazem") {

      if (!params.Identificador && !params.Designacao && !params.CodigoPostal && !params.NumeroPorta && !params.NomeRua &&
        !params.Localidade && !params.Pais && !params.Municipio && !params.Latitude && !params.Longitude && !params.Altitude &&
        !params.Estado) {
        return items
      }

      if (params.Identificador) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Identificador'].toLowerCase().includes(params.Identificador.toLowerCase())
        );
      }

      if (params.Designacao) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Designacao'].toLowerCase().includes(params.Designacao.toLowerCase())
        );
      }

      if (params.CodigoPostal) {
        finalList = finalList.filter((singleItem) =>
          singleItem['CodigoPostal'].toLowerCase().includes(params.CodigoPostal.toLowerCase())
        );
      }

      if (params.NumeroPorta) {
        finalList = finalList.filter((singleItem) =>
          singleItem['NumeroPorta'].toString().includes(params.NumeroPorta.toLowerCase())
        );
      }

      if (params.NomeRua) {
        finalList = finalList.filter((singleItem) =>
          singleItem['NomeRua'].toLowerCase().includes(params.NomeRua.toLowerCase())
        );
      }

      if (params.Localidade) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Localidade'].toLowerCase().includes(params.Localidade.toLowerCase())
        );
      }

      if (params.Pais) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Pais'].toLowerCase().includes(params.Pais.toLowerCase())
        );
      }

      if (params.Municipio) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Municipio'].toLowerCase().includes(params.Municipio.toLowerCase())
        );
      }

      if (params.Latitude) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Latitude'].toString().includes(params.Latitude.toLowerCase())
        );
      }

      if (params.Longitude) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Longitude'].toString().includes(params.Longitude.toLowerCase())
        );
      }

      if (params.Altitude) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Altitude'].toString().includes(params.Altitude.toLowerCase())
        );
      }

      if (params.Estado) {
        finalList = finalList.filter((singleItem) =>
          singleItem['Estado'].toString().includes(params.Estado.toLowerCase())
        );
      }
    } else if (domainType === "planeamento") {

      if (!params.matricula && !params.data && !params.armazens) {
        return items
      }

      if (params.matricula) {
        finalList = finalList.filter((singleItem) =>
          singleItem['matricula'].toLowerCase().includes(params.matricula.toLowerCase())
        );
      }

      if (params.data) {
        finalList = finalList.filter((singleItem) =>
          singleItem['data'].toLowerCase().includes(params.data.toLowerCase())
        );
      }

      if (params.armazens) {
        finalList = finalList.filter((singleItem) =>
          singleItem['armazens'].toLowerCase().includes(params.armazens.toLowerCase())
        );
      }
    }

    return finalList;
  }
}