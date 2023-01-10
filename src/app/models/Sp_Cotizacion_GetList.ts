export class Sp_Cotizacion_GetList{
    id_cliente:string
    Codidgo:string
    FechaCotizacion: string
    Cliente: string
    DescripcionCotizacion: string                                                                                                                                                                                                                                            
    OrdenCompra : string
    FechaEntregaOC : string
    FechaRige  : string
    FechaEntrega : string
    Moneda:string
    Descuento:string                         
    GranTotal:string                 
    Facturada:string
    Observaciones:string
   
    
        constructor
        (   id_cliente: string,
            Codidgo:string,
            FechaCotizacion:string,
            Cliente:string,
            DescripcionCotizacion:string,
            OrdenCompra:string,
            FechaEntregaOC:string,
            FechaRige:string,
            FechaEntrega:string,
            Moneda:string,
            Descuento:string,
            GranTotal:string,                 
            Facturada:string,
            Observaciones:string
        )
        {
            this.id_cliente=id_cliente;    
            this.Codidgo = Codidgo;
            this.FechaCotizacion = FechaCotizacion;
            this.Cliente = Cliente;
            this.DescripcionCotizacion = DescripcionCotizacion;
            this.OrdenCompra = OrdenCompra ;
            this.FechaEntregaOC = FechaEntregaOC;
            this.FechaRige = FechaRige;
            this.FechaEntrega = FechaEntrega;
            this.Moneda = Moneda;
            this.Descuento = Descuento;
            this.GranTotal = GranTotal;
            this.Facturada = Facturada;
            this.Observaciones = Observaciones ;
        }
        

        
    }


