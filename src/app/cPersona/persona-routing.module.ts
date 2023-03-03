import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

import { DetailsPersonaComponent } from "./components/details-persona/details-cliente.component";
import { ListPersonaComponent } from "./components/list-persona/list-persona.component";
const routes: Routes =[
    {
        path:'',
        component:ListPersonaComponent,
    },
    {
        path:'/:id',
        component:DetailsPersonaComponent
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