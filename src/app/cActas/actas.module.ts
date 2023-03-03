
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFacturaComponent } from './Components/List-acta/list-factura.component';
import { DetailFacturaComponent } from './Components/Detail-acta/detail-factura.component';
import { SharedModule } from '../shared/Material.module';
import { Add_ActasComponent } from './Components/Add-actas/add-actas.component';
import { EditFacturaComponent } from './Components/Edit-acta/edit-factura.component';
import { DelEstadoFacturaComponent } from './Components/Del-Estado_acta/del-estado-factura.component';
import { CarItemAddComponent } from './Components/Car-add-Items/car-item-add.component';
import { CarPagosAddComponent } from './Components/Car-add-fil/car-pagos-add.component';
import { CarSelecPagosComponent } from './Components/Car-Selec_acta/car-selec-pagos.component';
import { VerItemDetalleComponent } from './Components/Ver-ItemDetail/ver-item-detalle.component';
import { EditarCantidadComponent } from './Components/Edit-Cantidad/editar-cantidad.component';
import { TrackingComponent } from './Components/Seg-Tracking/tracking.component';
import { SeguirTrackComponent } from './Components/Seg-Estaciones/seguir-track.component';


@NgModule({
  declarations: [    
    ListFacturaComponent,
    DetailFacturaComponent,
    Add_ActasComponent,
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
    CommonModule,    
    SharedModule
    
  ]
})
export class Acta_Module { }
