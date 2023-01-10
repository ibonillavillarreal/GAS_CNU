import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenRoutingModule } from './orden-routing.module';
import { AddOrdenComponent } from './component/Add-Orden/add-orden.component';
import { OrdenComponent } from './component/List-Orden/List-Orden.component';
import { EditOrdenComponent } from './component/Edit-Orden/edit-orden.component';
import { DetailOrdenComponent } from './component/Detail-Orden/detail-orden.component';
import { SharedModule } from '../shared/Material.module';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { AddProyectoComponent } from './component/add-proyecto/add-proyecto.component';
import { AnularOrdenComponent } from './component/anular-orden/anular-orden.component';
import { AddConsumoComponent } from './component/add-consumo/add-consumo.component';
import { TrackingComponent } from './component/tracking/tracking.component';
import { SeguimientoComponent } from './component/seguimiento/seguimiento.component';


@NgModule({
  declarations: [
    AddOrdenComponent,
    OrdenComponent,
    EditOrdenComponent,
    DetailOrdenComponent,
    AddProyectoComponent,
    AnularOrdenComponent,
    AddConsumoComponent,
    TrackingComponent,
    SeguimientoComponent
    
  ],
  imports: [
    CommonModule,    
    OrdenRoutingModule,
    SharedModule,
    MatAutocompleteModule
  ]
})
export class OrdenModule { }
