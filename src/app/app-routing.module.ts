
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { DetailsPersonaComponent } from './cPersona/components/details-persona/details-cliente.component';
import { AddAgendaComponent } from './cAgenda/component/add-agenda/add-agenda.component';
import { DetailsAgendaComponent } from './cAgenda/component/detalles-agenda/details-agenda.component';
import { EditAgendaComponent } from './cAgenda/component/editar-agenda/edit-agenda.component';
import { ImprimirComponent } from './cAgenda/component/imprimir/imprimir.component';
import { AddResolutoComponent } from './cResolutos/components/add-Resoluto/add-resoluto.component';
import { ListFacturaComponent } from './cActas/Components/List-acta/list-factura.component';
import { Add_ActasComponent } from './cActas/Components/Add-actas/add-actas.component';


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

  /*Personas*/
  {
    path: 'Personas',
    pathMatch: 'full',
    loadChildren: () => import('./cPersona/persona.module').then(m => m.PersonaModule)
  },


  {
    path:'Personas/:id',
    component:DetailsPersonaComponent
  },
 
  
  /*Agendas*/
  {
    path: 'Agenda',
    pathMatch: 'full',
    loadChildren: () => import('./cAgenda/agenda.module').then(m => m.AgendaModule)
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
  component:EditAgendaComponent

 },


 /**** RESOLUCIONES  - alias:  Resolutos  ******/
 {
  path:'Precio',
  pathMatch: 'full',
  loadChildren: () => import('./cResolutos/Resoluto.module').then(O => O.Resolutos_Module)
},
{
  path:'Precio/add', 
  component:AddResolutoComponent
  
},





/******* MODULO DE ACTAS ******/
{
  //path:'Factura',
  path:'Acta',
  pathMatch: 'full',
  loadChildren: () => import('./cActas/actas.module').then(O => O.Acta_Module)
},
{
  //path:'ListFactura', 
  path:'ListActa', 
  component:ListFacturaComponent
  
},

{
  //path:'ListFactura/Add', 
  path:'ListActa/Add', 
  component:Add_ActasComponent
  
},
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
