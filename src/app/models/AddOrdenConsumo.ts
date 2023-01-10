export class AddOrdenConsumo{
    id_orden_trabajo_detalle: number;
    base:number;
    altura: number;
    id_usuario: number;

    constructor(id_orden_trabajo_detalle: number, base: number, altura: number, id_usuario:number){
        this.id_orden_trabajo_detalle = id_orden_trabajo_detalle;
        this.base = base;
        this.altura = altura;
        this.id_usuario = id_usuario 
    }
}