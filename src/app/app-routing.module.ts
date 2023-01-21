import { Component, ComponentRef, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { DetailsClienteComponent } from './Cliente/components/details-cliente/details-cliente.component';
import { AddCotizacionComponent } from './Cotizacion/component/add-cotizacion/add-cotizacion.component';
import { DetailsCotizacionComponent } from './Cotizacion/component/details-cotizacion/details-cotizacion.component';
import { EditCotizacionComponent } from './Cotizacion/component/edit-cotizacion/edit-cotizacion.component';
import { ImprimirComponent } from './Cotizacion/component/imprimir/imprimir.component';
import { ListCotizacionComponent } from './Cotizacion/component/List-cotizacion/List-cotizacion.component';
import { DetailOrdenComponent } from './Orden/component/Detail-Orden/detail-orden.component';
import { EditOrdenComponent } from './Orden/component/Edit-Orden/edit-orden.component';
import { PreciosComponent } from './Precios/components/List-Precio/List-precios.component';
import { AddPrecioComponent } from './Precios/components/add-Precio/add-precio.component';
import { FacturaModule } from './Facturacion/factura.module';
import { DetailFacturaComponent } from './Facturacion/Components/Detail-factura/detail-factura.component';
import { ListFacturaComponent } from './Facturacion/Components/List-factura/list-factura.component';
import { AddFacturaComponent } from './Facturacion/Components/Add-factura/add-factura.component';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';


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
    path: 'Cliente',
    pathMatch: 'full',
    loadChildren: () => import('./Cliente/cliente.module').then(m => m.ClienteModule)
  },


  {
    path:'Cliente/:id',
    component:DetailsClienteComponent
  },
 

  
  /*Cotizacion*/
  {
    path: 'Cotizacion',
    pathMatch: 'full',
    loadChildren: () => import('./Cotizacion/Cotizacion.module').then(m => m.CotizacionModule)
  },
  {
    path:'Cotizacion/add', 
    component:AddCotizacionComponent
    
  },
  {
    path:'Cotizacion/:id', 
    component:DetailsCotizacionComponent
  },
  {
    path:'Cotizacion/:id/:id', 
    component:ImprimirComponent
  },
  

 {
  path:'Cotizacion/VistaDetalle/:id', 
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
