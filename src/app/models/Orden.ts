export class Orden{
    id_orden:number;
    cliente:string;
    num_novar:string;
    num_orden:string;
    fecha_reg:Date
    constructor(id_orden:number,cliente:string,num_novar:string,num_orden:string,fecha_reg:Date){
        this.id_orden = id_orden;
        this.cliente = cliente;
        this.num_novar = num_novar;
        this.num_orden = num_orden;
        this.fecha_reg = fecha_reg;
    }
    
}