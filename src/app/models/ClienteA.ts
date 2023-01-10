

export class ClienteA{

    /***CAMPOS CLIENTE
           @CLIENTE varchar(20) = NULL,
		   @RUC varchar(50) = NULL,
           @CONTRIBUYENTE varchar(20) = NULL,
           @TIPO_CONTRIBUYENTE varchar(1) = NULL,
           @CATEGORIA_CLIENTE varchar(8) = NULL,
           @NOMBRE varchar(150) = NULL,
           @PAIS varchar(4) = NULL,
           @DIRECCION text = NULL,
           @E_MAIL varchar(249) = NULL,
           @TELEFONO1 varchar(50) = NULL,
           @TELEFONO2 varchar(50) = NULL,
           @MOROSO varchar(1) = '0',
           @USUARIO_CREACION  varchar(25) = NULL,
           @USUARIO_ULT_MOD varchar(25) = NULL,
           @ACTIVO varchar(1) = '1'
    ***/
   
        //CLIENTE
        CLIENTE:string
        RUC :string
        CONTRIBUYENTE :string
        NOMBRE:string
        DIRECCION :string
        EMAIL :string
        TELEFONO1 :string
        TELEFONO2 :string
        //
        paisId:number
        departamentoId:number
        municipioId:number
        //REPRESENTANTE LEGAL
        nombres_repL:string
        apellidos_repL:string
        cedula_repL:string
        direccion_repL:string
        correo_repL:string
        telefono1_repL:string
        telefono2_repL:string
        //
        pais_repL:number
        departamento_repL:number
        municipio_repL:number
        //RESPONSABLE DE PAGOS
        nombres_repP:string
        apellidos_repP:string
        cedula_repP:string
        direccion_repP:string
        correo_repP:string
        telefono1_repP:string
        telefono2_repP:string
        //
        pais_repP:number
        departamento_repP:number
        municipio_repP:number

        constructor
        (
            CLIENTE:string,
            RUC :string,
            CONTRIBUYENTE :string,
            NOMBRE:string,
            DIRECCION :string,
            EMAIL :string,
            TELEFONO1 :string,
            TELEFONO2 :string,
            //
            paisId:number,
            departamentoId:number,
            municipioId:number,
            // 
            nombres_repL:string,
            apellidos_repL:string,
            cedula_repL:string,
            direccion_repL:string,
            correo_repL:string,
            telefono1_repL:string,
            telefono2_repL:string,
            //
            pais_repL:number,
            departamento_repL:number,
            municipio_repL:number,
            //
            nombres_repP:string,
            apellidos_repP:string,
            cedula_repP:string,
            direccion_repP:string,
            correo_repP:string,
            telefono1_repP:string,
            telefono2_repP:string,
            //
            pais_repP:number,
            departamento_repP:number,
            municipio_repP:number
            ){
    
                this.CLIENTE= CLIENTE;
                this.RUC=  RUC ;
                this.CONTRIBUYENTE= CONTRIBUYENTE ;
                this.NOMBRE= NOMBRE;
                this.DIRECCION= DIRECCION ;
                this.EMAIL= EMAIL ;
                this.TELEFONO1= TELEFONO1 ;
                this.TELEFONO2= TELEFONO2 ;
                this.paisId = paisId;
                this.departamentoId = departamentoId;
                this.municipioId = municipioId;              
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
