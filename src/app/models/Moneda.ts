export class Monedas{

     MONEDA:string;
     NOMBRE:string; 
     TasaCapitalizacion: number; 

    constructor(
        MONEDA:string,
        NOMBRE:string,
        TasaCapitalizacion: number)
    {
        this.MONEDA = MONEDA;
        this.NOMBRE = NOMBRE;
        this.TasaCapitalizacion=TasaCapitalizacion;
    }
}