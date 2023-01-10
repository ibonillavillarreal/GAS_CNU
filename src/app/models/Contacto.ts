export class Contacto{
    id:number
    nombres:string
    apellidos:string
    cedula:string
    direccion?:string
    correo:string
    telefono1:string
    telefono2:string
    municipioId?:number
    clienteId:number
    config_catalogoId:number
    constructor(id:number,nombres:string,apellidos:string,cedula:string,
        correo:string,telefono1:string,telefono2:string,clienteId:number,config_catalogoId:number){
            this.id = id;
            this.nombres = nombres;
            this.apellidos = apellidos;
            this.cedula = cedula;
            this.correo = correo;
            this.telefono1 = telefono1;
            this.telefono2 = telefono2;
            this.clienteId = clienteId;
            this.config_catalogoId = config_catalogoId;
    }
}