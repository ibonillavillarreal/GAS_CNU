
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/Material.module";
import { AgendaRoutingModule } from "./agenda-routing.module";
import { ListAgendaComponent } from './component/List-agenda/List-Agenda.component';
import { AddAgendaComponent } from './component/add-agenda/add-agenda.component';
import { EditAgendaComponent } from './component/editar-agenda/edit-agenda.component';
import { DetailsAgendaComponent } from './component/detalles-agenda/details-agenda.component';
import { AddItemComponent } from './component/add-item/add-item.component';
import { AddItemSComponent } from './component/add-item-puntos/add-itemPuntos.component';
import { ViewItemsComponent } from './component/view-Items/view-items.component';
import { EditafilaCampoComponent } from './component/editFilaUso/editfila-Campo.component';
import { ImprimirComponent } from "./component/imprimir/imprimir.component";
import { NgxPrintModule } from "ngx-print";

@NgModule({
    declarations:[
     
        DetailsAgendaComponent,
        ListAgendaComponent,
        AddAgendaComponent,        
        EditAgendaComponent,
        DetailsAgendaComponent,
        AddItemComponent,
        AddItemSComponent,
        ViewItemsComponent,
        EditafilaCampoComponent,                
        ImprimirComponent
  ],
    imports:[
        AgendaRoutingModule,
        CommonModule,
        SharedModule,
        NgxPrintModule
    ]
})

export class AgendaModule{

}

