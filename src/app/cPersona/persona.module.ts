
import { NgModule } from "@angular/core";
import { ListClienteComponent } from "./components/list-persona/list-persona.component";
import { DetailsClienteComponent } from "./components/details-persona/details-cliente.component";
import { EditClienteComponent } from "./components/edit-cliente/edit-cliente.component";
import { AddClienteComponent } from "./components/add-persona/add-persona.component";
import { ClienteRoutingModule } from "./persona-routing.module";
import { EditContactoComponent } from "./components/edit-contacto/edit-contacto.component";
import { AddResponsableComprasComponent } from "./components/add-responsable-compras/add-responsable-compras.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/Material.module";
import { ListResponsableComprasComponent } from './components/list-responsable-compras/list-responsable-compras.component';


@NgModule({
    declarations:[
        ListClienteComponent,
        DetailsClienteComponent,
        EditClienteComponent,
        AddClienteComponent,
        EditContactoComponent,
        AddResponsableComprasComponent,
        ListResponsableComprasComponent
        
    ],
    imports:[
        ClienteRoutingModule,
        CommonModule,
        SharedModule
    ]
})

export class ClienteModule{

}