
import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { ListCotizacionComponent } from "./component/List-agenda/List-Agenda.component";

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