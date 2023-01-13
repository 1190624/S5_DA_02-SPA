export class Planeamento{
    matricula: string;
    data:string;
    armazens:string

    constructor(matricula: string, data: string, armazens:string){
            this.matricula = matricula;
            this.data = data;
            this.armazens = armazens;
        }
}