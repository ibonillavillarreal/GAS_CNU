
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/Material.module";
import { CotizacionRoutingModule } from "./agenda-routing.module";
import { ListAgendaComponent } from './component/List-agenda/List-Agenda.component';
import { AddAgendaComponent } from './component/add-agenda/add-agenda.component';
import { DeleteCotizacionComponent } from './component/delete-agenda/delete-cotizacion.component';
import { EditCotizacionComponent } from './component/editar-agenda/edit-cotizacion.component';
import { DetailsAgendaComponent } from './component/detalles-agenda/details-agenda.component';
import { AddItemComponent } from './component/add-item/add-item.component';
import { AddItemSComponent } from './component/add-item-puntos/add-itemPuntos.component';
import { ViewItemsComponent } from './component/view-Items/view-items.component';
import { ViewAddItemsComponent } from './component/ViewAddItems/view-add-items.component';
import { EditafilaCampoComponent } from './component/editFilaUso/editfila-Campo.component';
import { AddDetailsProyectComponent } from './component/add-detalles/add-detalles.component';
import { EditProyectoComponent } from "./component/edit-proyecto/edit-proyecto.component";
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
        EditafilaCampoComponent,
        AddDetailsProyectComponent,
        EditProyectoComponent,        
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

