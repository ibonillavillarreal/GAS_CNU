import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/Material.module";

import { Resoluto_RoutingModule } from './Resoluto-routing.module';
import { List_ResolutoComponent } from './components/List-Resoluto/List-precios.component';
import { AddResolutoComponent } from './components/add-Resoluto/add-resoluto.component';
import { DeletResolutoComponent } from './components/Delet-Resoluto/delet-resoluto.component';
import { VerResolutoComponent } from './components/Ver-Resoluto/ver-Resoluto.component';
import { EditResolutoComponent } from './components/Edit-Campo-Resoluto/edit-resoluto.component';


@NgModule({
  declarations: [
    List_ResolutoComponent,
    AddResolutoComponent,    
    DeletResolutoComponent,
    VerResolutoComponent,
    EditResolutoComponent
    
  ],
  imports: [
    Resoluto_RoutingModule,
    CommonModule,
    SharedModule,
    
  ]
})
export class Resolutos_Module { }
