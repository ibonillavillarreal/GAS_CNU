import { Component, ComponentRef, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { DetailsClienteComponent } from './cPersona/components/details-persona/details-cliente.component';
import { AddAgendaComponent } from './cAgenda/component/add-agenda/add-agenda.component';
import { DetailsAgendaComponent } from './cAgenda/component/detalles-agenda/details-agenda.component';
import { EditCotizacionComponent } from './cAgenda/component/editar-agenda/edit-cotizacion.component';
import { ImprimirComponent } from './cAgenda/component/imprimir/imprimir.component';

import { AddPrecioComponent } from './cResolutos/components/add-Precio/add-precio.component';
import { ListFacturaComponent } from './cActas/Components/List-acta/list-factura.component';
import { AddFacturaComponent } from './cActas/Components/Add-actas/add-factura.component';



const routes: Routes = [
  
    /* Rutas vacia -- validar contra permisos */
  {
    path:"localhost",    
    pathMatch: 'full',    
    component:Component,
    redirectTo:"",
  },

  {
    path:"",
    pathMatch: 'full',
    component:Component, 
    
  },

  /*Clientes*/
  {
    path: 'Personas',
    pathMatch: 'full',
    loadChildren: () => import('./cPersona/persona.module').then(m => m.ClienteModule)
  },


  {
    path:'Personas/:id',
    component:DetailsClienteComponent
  },
 
  
  /*Agenda*/
  {
    path: 'Agenda',
    pathMatch: 'full',
    loadChildren: () => import('./cAgenda/agenda.module').then(m => m.CotizacionModule)
  },

  {
    path:'Agenda/add', 
    component:AddAgendaComponent
    
  },
  {
    path:'Agenda/:id', 
    component:DetailsAgendaComponent
  },
  {
    path:'Agenda/:id/:id', 
    component:ImprimirComponent
  },
  

 {
  path:'Agenda/VistaDetalle/:id', 
  component:EditCotizacionComponent

 },


 

  



 /*Niveles de Precio*/
 {
  path:'Precio',
  pathMatch: 'full',
  loadChildren: () => import('./cResolutos/precios.module').then(O => O.PreciosModule)
},
{
  path:'Precio/add', 
  component:AddPrecioComponent
  
},

/* Facturacion */
{
  path:'Factura',
  pathMatch: 'full',
  loadChildren: () => import('./cActas/actas.module').then(O => O.FacturaModule)
},
{
  path:'ListFactura', 
  component:ListFacturaComponent
  
},
{
  path:'ListFactura/Add', 
  component:AddFacturaComponent
  
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
