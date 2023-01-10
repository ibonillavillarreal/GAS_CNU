export class AddOrden{
    id_detalle_cotizacion: number;
    id_usuario: number;
    return_value: number;

    constructor(id_detalle_cotizacion:number,  id_usuario:number, return_value:number){
        this.id_detalle_cotizacion = id_detalle_cotizacion;
        this.id_usuario = id_usuario;
        this.return_value = return_value;
    }
}