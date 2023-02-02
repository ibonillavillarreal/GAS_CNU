import { Data } from "@angular/router"

export class Cliente{

    // RREPRESENTES  
    CodMiembro:number
    CodCargo:number
    CodClaustro:number
    CodGradoAcademico:number
    Nombres:string 
    Apellidos:string
    Telefono:string
    Email:string
    FechaRegistro:string 
    EstadoRegistro:number
    IdUsuario:number
    Operacion:number

        //CLIENTE
        id_cliente:number;
        public razon_social:string
        nombre:string
        ruc:string
        direccion:string
        telefono1:string
        telefono2:string
        telefono3:string
        telefono4:string
        municipioId:number
        //REPRESENTANTE LEGAL
        nombres_repL:string
        apellidos_repL:string
        cedula_repL:string
        direccion_repL:string
        correo_repL:string
        telefono1_repL:string
        telefono2_repL:string
        municipio_repL:number
        //RESPONSABLE DE PAGOS
        nombres_repP:string
        apellidos_repP:string
        cedula_repP:string
        direccion_repP:string
        correo_repP:string
        telefono1_repP:string
        telefono2_repP:string
        municipio_repP:number
    
        
    
        constructor(
            CodMiembro:number,
            CodCargo:number,
            CodClaustro:number,
            CodGradoAcademico:number,
            Nombres:string,
            Apellidos:string,
            Telefono:string,
            Email:string,
            FechaRegistro:string,
            EstadoRegistro:number,
            IdUsuario:number,
            Operacion:number,            
            
            id:number,razon_social:string, nombre:string,ruc:string,direccion:string,municipioId:number,telefono1:string,
            telefono2:string,telefono3:string,telefono4:string,nombres_repL:string,apellidos_repL:string,cedula_repL:string,direccion_repL:string,correo_repL:string,
            telefono1_repL:string,telefono2_repL:string,municipio_repL:number,nombres_repP:string,apellidos_repP:string,cedula_repP:string,direccion_repP:string,correo_repP:string,
            telefono1_repP:string,telefono2_repP:string,municipio_repP:number){

                this.CodMiembro  = CodMiembro; 
                this.CodCargo  = CodCargo; 
                this.CodClaustro  = CodClaustro; 
                this.CodGradoAcademico  = CodGradoAcademico; 
                this.Nombres  = Nombres; 
                this.Apellidos  = Apellidos; 
                this.Telefono  = Telefono; 
                this.Email  = Email; 
                this.FechaRegistro  = FechaRegistro; 
                this.EstadoRegistro  = EstadoRegistro; 
                this.IdUsuario  = IdUsuario; 
                this.Operacion  = Operacion; 

    
                this.id_cliente = id;
                this.razon_social = razon_social;
                this.nombre = nombre;
                this.ruc = ruc;
                this.direccion = direccion;
                this.municipioId = municipioId;
                this.telefono1 = telefono1;
                this.telefono2 = telefono2;
                this.telefono3 = telefono3;
                this.telefono4 = telefono4;
                
                this.nombres_repL = nombres_repL;
                this.apellidos_repL = apellidos_repL;
                this.cedula_repL = cedula_repL;
                this.direccion_repL = direccion_repL;
                this.correo_repL = correo_repL;
                this.telefono1_repL = telefono1_repL;
                this.telefono2_repL = telefono2_repL;
                this.municipio_repL = municipio_repL;
    
                this.nombres_repP = nombres_repP;
                this.apellidos_repP = apellidos_repP;
                this.cedula_repP = cedula_repP
                this.direccion_repP = direccion_repP;
                this.correo_repP = correo_repP;
                this.telefono1_repP = telefono1_repP;
                this.telefono2_repP = telefono2_repP;
                this.municipio_repP = municipio_repP;
        }
        
        
    }
  