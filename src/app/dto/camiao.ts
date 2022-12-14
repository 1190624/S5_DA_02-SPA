
export class Camiao{
    matricula: string;
    caracteristica: string;
    autonomia:number;
    capacidadeTransporte:number;
    capacidadeBateria:number;
    tara: number;
    tempoCarregamento:string;


    constructor(matricula: string, caracteristica: string, autonomia:number, capacidadeTransporte:number, capacidadeBateria:number,
        tara: number, tempoCarregamento:string){
            this.matricula = matricula;
            this.caracteristica = caracteristica;
            this.autonomia =autonomia;
            this.capacidadeTransporte = capacidadeTransporte;
            this.capacidadeBateria = capacidadeBateria;
            this.tara = tara;
            this.tempoCarregamento = tempoCarregamento;
        }
}