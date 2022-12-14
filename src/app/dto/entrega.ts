export class Entrega{
    identificador: string;
    armazémID: string;
    dia:number;
    mês:number;
    ano:number;
    massa: number;
    tempoColocação: number;
    tempoRetirada: number;

    constructor(identificador: string, armazémID: string, dia: number, mês: number, ano: number, massa: number, tempoColocação: number, tempoRetirada: number){
            this.identificador = identificador;
            this.armazémID = armazémID;
            this.dia = dia;
            this.mês = mês;
            this.ano = ano;
            this.massa = massa;
            this.tempoColocação = tempoColocação;
            this.tempoRetirada = tempoRetirada;
        }
}