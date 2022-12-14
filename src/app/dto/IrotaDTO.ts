export class IrotaDTO{
    rotaId: number;
    origem: string;
    destino: string;
    distancia: number;
    tempo: string;
    gastoEnergetico: number;
    tempoCargaExtra: string;

    constructor(rotaId: number,
        rotaOrigem: string,
        rotaDestino: string,
        rotaDistancia: number,
        rotaTempo: string,
        rotaGastoEnergetico: number,
        rotaTempoCargaExtra: string) {
            this.rotaId = rotaId;
            this.origem = rotaOrigem;
            this.destino = rotaDestino;
            this.distancia = rotaDistancia;
            this.tempo = rotaTempo;
            this.gastoEnergetico = rotaGastoEnergetico;
            this.tempoCargaExtra = rotaTempoCargaExtra;
        }
}