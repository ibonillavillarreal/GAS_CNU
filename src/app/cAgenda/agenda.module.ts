
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/Material.module";

import { ListClienteComponent } from "../cPersona/components/list-persona/list-persona.component";
import { DetailsClienteComponent } from "../cPersona/components/details-persona/details-cliente.component";
import { EditClienteComponent } from "../cPersona/components/edit-cliente/edit-cliente.component";
import { AddClienteComponent } from "../cPersona/components/add-persona/add-persona.component";
import { EditContactoComponent } from "../cPersona/components/edit-contacto/edit-contacto.component";
import { AddResponsableComprasComponent } from "../cPersona/components/add-responsable-compras/add-responsable-compras.component";
import { CotizacionRoutingModule } from "./agenda-routing.module";
import { ListAgendaComponent } from './component/List-agenda/List-Agenda.component';
import { AddCotizacionComponent } from './component/add-cotizacion/add-cotizacion.component';
import { DeleteCotizacionComponent } from './component/delete-cotizacion/delete-cotizacion.component';
import { EditCotizacionComponent } from './component/edit-cotizacion/edit-cotizacion.component';
import { DetailsCotizacionComponent } from './component/details-cotizacion/details-cotizacion.component';
import { AddItemComponent } from './component/add-item/add-item.component';
import { AddItemSComponent } from './component/add-item-s/add-item-s.component';
import { ViewItemsComponent } from './component/view-Items/view-items.component';
import { ViewAddItemsComponent } from './component/ViewAddItems/view-add-items.component';
import { EditfilaUsoCantidadComponent } from './component/editFilaUso/editfila-uso-cantidad.component';
import { AddDetailsProyectComponent } from './component/add-details-proyect/add-details-proyect.component';
import { EditProyectoComponent } from "./component/edit-proyecto/edit-proyecto.component";
import { DetailsCotizacionProyectoComponent } from './component/details-cotizacion-proyecto/details-cotizacion-proyecto.component';
import { ImprimirComponent } from "./component/imprimir/imprimir.component";
import { NgxPrintModule } from "ngx-print";

@NgModule({
    declarations:[
     
        DetailsCotizacionComponent,
        ListAgendaComponent,
        AddCotizacionComponent,
        DeleteCotizacionComponent,
        EditCotizacionComponent,
        DetailsCotizacionComponent,
        AddItemComponent,
        AddItemSComponent,
        ViewItemsComponent,
        ViewAddItemsComponent,
        EditfilaUsoCantidadComponent,
        AddDetailsProyectComponent,
        EditProyectoComponent,
        DetailsCotizacionProyectoComponent,
        ImprimirComponent
  ],
    imports:[
        CotizacionRoutingModule,
        CommonModule,
        SharedModule,
        NgxPrintModule
    ]
})

export class CotizacionModule{

}

