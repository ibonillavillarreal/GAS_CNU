import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { ListFacturaComponent } from './Components/List-factura/list-factura.component';
import { DetailFacturaComponent } from './Components/Detail-factura/detail-factura.component';
import { SharedModule } from '../shared/Material.module';
import { AddFacturaComponent } from './Components/Add-factura/add-factura.component';
import { EditFacturaComponent } from './Components/Edit-factura/edit-factura.component';
import { DelEstadoFacturaComponent } from './Components/Del-EstadoFactura/del-estado-factura.component';
import { CarItemAddComponent } from './Components/Car-add-Items/car-item-add.component';
import { CarPagosAddComponent } from './Components/Car-add-Pagos/car-pagos-add.component';
import { CarSelecPagosComponent } from './Components/Car-SelecPagos/car-selec-pagos.component';
import { VerItemDetalleComponent } from './Components/Ver-ItemDetail/ver-item-detalle.component';
import { EditarCantidadComponent } from './Components/Edit-Cantidad/editar-cantidad.component';
import { TrackingComponent } from './Components/Seg-Tracking/tracking.component';
import { SeguirTrackComponent } from './Components/Seg-Estaciones/seguir-track.component';


@NgModule({
  declarations: [    
    ListFacturaComponent,
    DetailFacturaComponent,
    AddFacturaComponent,
    EditFacturaComponent,
    DelEstadoFacturaComponent,
    CarItemAddComponent,
    CarPagosAddComponent,
    CarSelecPagosComponent,
    VerItemDetalleComponent,
    EditarCantidadComponent,
    TrackingComponent,
    SeguirTrackComponent,    

  ],
  imports: [
    FacturaRoutingModule,
    CommonModule,    
    SharedModule
    
  ]
})
export class FacturaModule { }
