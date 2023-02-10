
import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { ListAgendaComponent } from "./component/List-agenda/List-Agenda.component";

const routes: Routes =[    
    {
        path: '',
        component:ListAgendaComponent,     
        
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