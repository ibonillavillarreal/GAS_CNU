import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrdenComponent } from './component/Add-Orden/add-orden.component';
import { DetailOrdenComponent } from './component/Detail-Orden/detail-orden.component';
import { EditOrdenComponent } from './component/Edit-Orden/edit-orden.component';
import { OrdenComponent } from './component/List-Orden/List-Orden.component';

const routes: Routes = [

    {
        path: '',
        component:OrdenComponent,
    },

    {
        path: 'addOrden',
        component: AddOrdenComponent
    },
    {
        path:'Orden/:id',
        component:DetailOrdenComponent,
    },

];

@NgModule({
  imports: [

    RouterModule.forChild(routes)

  ],
  exports: [

    RouterModule

  ]
})
export class OrdenRoutingModule { }
