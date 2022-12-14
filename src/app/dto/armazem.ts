export class Armazem{
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

    constructor(identificador: string, designacao: string, codigoPostal: string, numeroPorta: number,
        nomeRua: string, localidade: string, pais: string, municipio: string, latitude: number, longitude: number){
            this.identificador = identificador;
            this.designacao = designacao;
            this.codigoPostal = codigoPostal;
            this.numeroPorta = numeroPorta;
            this.nomeRua = nomeRua;
            this.localidade = localidade;
            this.pais = pais;
            this.municipio = municipio;
            this.latitude = latitude;
            this.longitude = longitude;
        } 
}