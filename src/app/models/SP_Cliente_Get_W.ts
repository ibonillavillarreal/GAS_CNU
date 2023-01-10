export class SP_Cliente_Get_W{
    /***CAMPOS CLIENTE
    @razon_social varchar(150),
    @nombre varchar(150),
    @ruc varchar(150),
    @direccion varchar(150),
    @telefono1 varchar(120),
    @telefono2 varchar(120),
    @telefono3 varchar(120),
    @telefono4 varchar(120),
    @municipioId int,
    REPRESENTANTE LEGAL
    @nombres_repL varchar(150),
    @apellidos_repL varchar(150),
    @cedula_repL varchar(30),
    @direccion_repL varchar(150),
    @correo_repL varchar(150),
    @telefono1_repL varchar(120),
    @telefono2_repL varchar(120),
    @municipio_repL int,
    RESPONSABLE DE PAGOS
    @nombres_repP varchar(150),
    @apellidos_repP varchar(150),
    @cedula_repP varchar(30),
    @direccion_repP varchar(150),
    @correo_repP varchar(150),
    @telefono1_repP varchar(120),
    @telefono2_repP varchar(120),
    @municipio_repP int****/
        //CLIENTE
        clienteId:number;
        razon_social:string
        nombre:string
        ruc:string
        direccion:string
        telefono1:string
        telefono2:string
        telefono3:string
        telefono4:string
        paisId:number;
        departamentoId:number;
        municipioId:number
        //REPRESENTANTE LEGAL
        idContacto_repL:number
        nombres_repL:string
        apellidos_repL:string
        cedula_repL:string
        direccion_repL:string
        correo_repL:string
        telefono1_repL:string
        telefono2_repL:string
        pais_repL:number
        departamento_repL:number
        municipio_repL:number
        //RESPONSABLE DE PAGOS
        idContacto_repP:number
        nombres_repP:string
        apellidos_repP:string
        cedula_repP:string
        direccion_repP:string
        correo_repP:string
        telefono1_repP:string
        telefono2_repP:string
        pais_repP:number
        departamento_repP:number
        municipio_repP:number

        
    
        constructor(id:number,razon_social:string, nombre:string,ruc:string,direccion:string,telefono1:string,
            telefono2:string,telefono3:string,telefono4:string,paisId:number,departamentoId:number,municipioId:number,idContacto_repL:number,nombres_repL:string,apellidos_repL:string,cedula_repL:string,direccion_repL:string,correo_repL:string,
            telefono1_repL:string,telefono2_repL:string,pais_repL:number,departamento_repL:number,municipio_repL:number,idContacto_repP:number,nombres_repP:string,apellidos_repP:string,cedula_repP:string,direccion_repP:string,correo_repP:string,
            telefono1_repP:string,telefono2_repP:string,pais_repP:number,departamento_repP:number,municipio_repP:number){
    
                this.clienteId = id;
                this.razon_social = razon_social;
                this.nombre = nombre;
                this.ruc = ruc;
                this.direccion = direccion;
                this.telefono1 = telefono1;
                this.telefono2 = telefono2;
                this.telefono3 = telefono3;
                this.telefono4 = telefono4;
                this.paisId = paisId;
                this.departamentoId = departamentoId;
                this.municipioId = municipioId;
                
                this.idContacto_repL = idContacto_repL;
                this.nombres_repL = nombres_repL;
                this.apellidos_repL = apellidos_repL;
                this.cedula_repL = cedula_repL;
                this.direccion_repL = direccion_repL;
                this.correo_repL = correo_repL;
                this.telefono1_repL = telefono1_repL;
                this.telefono2_repL = telefono2_repL;
                this.pais_repL = pais_repL;
                this.departamento_repL = departamento_repL;
                this.municipio_repL = municipio_repL;
    
                this.idContacto_repP = idContacto_repP
                this.nombres_repP = nombres_repP;
                this.apellidos_repP = apellidos_repP;
                this.cedula_repP = cedula_repP
                this.direccion_repP = direccion_repP;
                this.correo_repP = correo_repP;
                this.telefono1_repP = telefono1_repP;
                this.telefono2_repP = telefono2_repP;
                this.pais_repP = pais_repP;
                this.departamento_repP = departamento_repP;
                this.municipio_repP = municipio_repP;
        }
        

        
    }