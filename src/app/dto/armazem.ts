export class Armazem{
    Identificador: string;
    Designacao: string;
    CodigoPostal: string;
    NumeroPorta: number;
    NomeRua: string;
    Localidade: string;
    Pais: string;
    Municipio: string;
    Latitude: number;
    Longitude: number;

    constructor(identificador: string, designacao: string, codigoPostal: string, numeroPorta: number,
        nomeRua: string, localidade: string, pais: string, municipio: string, latitude: number, longitude: number){
            this.Identificador = identificador;
            this.Designacao = designacao;
            this.CodigoPostal = codigoPostal;
            this.NumeroPorta = numeroPorta;
            this.NomeRua = nomeRua;
            this.Localidade = localidade;
            this.Pais = pais;
            this.Municipio = municipio;
            this.Latitude = latitude;
            this.Longitude = longitude;
        } 
}