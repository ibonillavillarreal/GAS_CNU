export class SubTipoCatalogo{
    id:number
    id_tipo_catalogo:number
    descripcion:string
    constructor(id:number,id_tipo_catalogo:number,descripcion:string){
        this.id = id
        this.id_tipo_catalogo = id_tipo_catalogo;
        this.descripcion = descripcion;
    }
    
}