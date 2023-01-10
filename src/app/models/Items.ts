
export class Items{
        
        ARTICULO:string;
        DESCRIPCION:string;                                                                                                                                                                                                                                                   
        TIPO:string;
        Precio:string;  
        Precio$:string; 
        Largo:string;       
        Ancho:string;       
        Cantidad:string;                                
        MONEDA:string; 
        CostoBase:string;
        Iva:string;                                     
        IvaC$:string;
        Iva$ :string;
        subTotal:string; 
        subTotal$:string 
    
    constructor(
        ARTICULO:string,
        DESCRIPCION:string,                                                                                                                                                                                                                                                   
        TIPO:string,
        Precio$:string,
        Precio:string,                                  
        Largo:string,       
        Ancho:string,       
        Cantidad:string,                                
        MONEDA:string, 
        CostoBase:string,                               
        Iva:string,   
        IvaC$:string,
        Iva$ :string,                                 
        subTotal:string,
        subTotal$:string 
    )
    {
        this.ARTICULO=ARTICULO;             
        this.DESCRIPCION=DESCRIPCION;                                                                                                                                                                                                                                                    
        this.TIPO=TIPO;
        this.Precio=Precio;                                  
        this.Precio$=Precio$;                                  
        this.Largo=Largo;      
        this.Ancho=Ancho;       
        this.Cantidad=Cantidad;                                
        this.MONEDA=MONEDA; 
        this.CostoBase=CostoBase;                               
        this.Iva=Iva;   
        this.IvaC$=IvaC$;  
        this.Iva$ = Iva$;                              
        this.subTotal=subTotal;       
        this.subTotal$=subTotal$;       
    }
}
