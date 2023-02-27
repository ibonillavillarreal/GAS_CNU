import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

import { DetailsClienteComponent } from "./components/details-persona/details-cliente.component";
import { ListPersonaComponent } from "./components/list-persona/list-persona.component";
const routes: Routes =[
    {
        path:'',
        component:ListPersonaComponent,
    },
    {
        path:'/:id',
        component:DetailsClienteComponent
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
export class ClienteRoutingModule{

}