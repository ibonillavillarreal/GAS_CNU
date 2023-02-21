import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/Material.module";

import { PreciosRoutingModule } from './precios-routing.module';
import { PreciosComponent } from './components/List-Precio/List-precios.component';
import { AddPrecioComponent } from './components/add-Precio/add-precio.component';
import { DeletPrecioComponent } from './components/Delet-Precio/delet-precio.component';
import { VerPrecioComponent } from './components/ver-Precio/ver-precio.component';
import { EditPrecioComponent } from './components/Edit-Campo-Precio/edit-precio.component';


@NgModule({
  declarations: [
    PreciosComponent,
    AddPrecioComponent,    
    DeletPrecioComponent,
    VerPrecioComponent,
    EditPrecioComponent
    
  ],
  imports: [
    PreciosRoutingModule,
    CommonModule,
    SharedModule,
    
  ]
})
export class PreciosModule { }
