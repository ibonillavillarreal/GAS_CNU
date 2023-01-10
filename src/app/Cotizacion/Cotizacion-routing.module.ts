import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

import { ListCotizacionComponent } from "../Cotizacion/component/List-cotizacion/List-cotizacion.component";
import { DetailsClienteComponent } from "../Cliente/components/details-cliente/details-cliente.component";
import { DetailsCotizacionComponent } from "./component/details-cotizacion/details-cotizacion.component";


const routes: Routes =[
    {
        path: '',
        component:ListCotizacionComponent,
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class CotizacionRoutingModule{

}