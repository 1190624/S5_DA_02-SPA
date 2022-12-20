export class Entrega{
    identificador: string;
    armazemID: string;
    dia:number;
    mes:number;
    ano:number;
    massa: number;
    tempoColocacao: number;
    tempoRetirada: number;

    constructor(identificador: string, armazemID: string, dia: number, mes: number, ano: number, massa: number, tempoColocacao: number, tempoRetirada: number){
            this.identificador = identificador;
            this.armazemID = armazemID;
            this.dia = dia;
            this.mes = mes;
            this.ano = ano;
            this.massa = massa;
            this.tempoColocacao = tempoColocacao;
            this.tempoRetirada = tempoRetirada;
        }
}