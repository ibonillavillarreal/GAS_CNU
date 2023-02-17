
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
import { AddAgendaComponent } from './component/add-agenda/add-agenda.component';
import { DeleteCotizacionComponent } from './component/delete-cotizacion/delete-cotizacion.component';
import { EditCotizacionComponent } from './component/edit-cotizacion/edit-cotizacion.component';
import { DetailsAgendaComponent } from './component/details-agenda/details-agenda.component';
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
     
        DetailsAgendaComponent,
        ListAgendaComponent,
        AddAgendaComponent,
        DeleteCotizacionComponent,
        EditCotizacionComponent,
        DetailsAgendaComponent,
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

