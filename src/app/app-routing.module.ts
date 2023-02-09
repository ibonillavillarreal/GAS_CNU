import { Component, ComponentRef, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { DetailsClienteComponent } from './cPersona/components/details-cliente/details-cliente.component';
import { AddCotizacionComponent } from './cAgenda/component/add-cotizacion/add-cotizacion.component';
import { DetailsCotizacionComponent } from './cAgenda/component/details-cotizacion/details-cotizacion.component';
import { EditCotizacionComponent } from './cAgenda/component/edit-cotizacion/edit-cotizacion.component';
import { ImprimirComponent } from './cAgenda/component/imprimir/imprimir.component';
import { DetailOrdenComponent } from './Orden/component/Detail-Orden/detail-orden.component';
import { EditOrdenComponent } from './Orden/component/Edit-Orden/edit-orden.component';
import { AddPrecioComponent } from './Precios/components/add-Precio/add-precio.component';
import { ListFacturaComponent } from './Facturacion/Components/List-factura/list-factura.component';
import { AddFacturaComponent } from './Facturacion/Components/Add-factura/add-factura.component';



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
    loadChildren: () => import('./cAgenda/Cotizacion.module').then(m => m.CotizacionModule)
  },

  {
    path:'Agenda/add', 
    component:AddCotizacionComponent
    
  },
  {
    path:'Agenda/:id', 
    component:DetailsCotizacionComponent
  },
  {
    path:'Agenda/:id/:id', 
    component:ImprimirComponent
  },
  

 {
  path:'Agenda/VistaDetalle/:id', 
  component:EditCotizacionComponent

 },


 /*Orden*/
 {
  path:'Orden',
  pathMatch: 'full',
  loadChildren: () => import('./Orden/orden.module').then(O => O.OrdenModule)
},

{
  path:'Orden/Edit/:id', 
  component:EditOrdenComponent
  
  },
  
  {
    path:'Orden/Vista/Ver/:id', 
    component:DetailOrdenComponent
    
  },


 /*Niveles de Precio*/
 {
  path:'Precio',
  pathMatch: 'full',
  loadChildren: () => import('./Precios/precios.module').then(O => O.PreciosModule)
},
{
  path:'Precio/add', 
  component:AddPrecioComponent
  
},

/* Facturacion */
{
  path:'Factura',
  pathMatch: 'full',
  loadChildren: () => import('./Facturacion/factura.module').then(O => O.FacturaModule)
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
