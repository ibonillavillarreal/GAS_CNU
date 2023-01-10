export class Sp_Cotizacion_GetID{

        codigo_cotizacion:string
        cliente:string
        razon_social:string
        ruc:string
        odc:string  
        email:string
        telefono1:string
        fecha_cotizacion:string
        fecha_rige:string
        fecha_orden:string
        fecha_entrega:string
        dias_plazo:string
        descripcion_cotizacion:string
        moneda:string
        tipo_cambio:string
        sub_total:string
        descuento:string
        iva:string
        gran_total:string
        esta_facturada:string


        constructor
        (
            codigo_cotizacion:string,
            cliente:string,
            razon_social:string,
            ruc:string,
            odc:string, 
            email:string,
            telefono1:string,
            fecha_cotizacion:string,
            fecha_rige:string,
            fecha_orden:string,
            fecha_entrega:string,
            dias_plazo:string,
            descripcion_cotizacion:string,
            moneda:string,
            tipo_cambio:string,
            sub_total:string,
            descuento:string,
            iva:string,
            gran_total:string,
            esta_facturada:string
        )
        {
            this.codigo_cotizacion =codigo_cotizacion;
            this.cliente =cliente ;
            this.razon_social =razon_social;
            this.ruc =ruc;
            this.odc =odc;
            this.email =email;
            this.telefono1 =telefono1;
            this.fecha_cotizacion =fecha_cotizacion;
            this.fecha_rige =fecha_rige;
            this.fecha_orden =fecha_orden;
            this.fecha_entrega = fecha_entrega;
            this.dias_plazo = dias_plazo;
            this.descripcion_cotizacion = descripcion_cotizacion;
            this.moneda = moneda; 
            this.tipo_cambio =tipo_cambio;
            this.sub_total =sub_total;
            this.descuento =descuento;
            this.iva = iva;
            this.gran_total = gran_total;
            this.esta_facturada = esta_facturada;
        }
 
}



    

