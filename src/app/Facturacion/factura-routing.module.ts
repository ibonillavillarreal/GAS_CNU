import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFacturaComponent } from './Components/List-factura/list-factura.component';

const routes: Routes = [
  {
    path: '',
    component:ListFacturaComponent,
}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    
  ],
  exports: [
    RouterModule
  ]
})
export class FacturaRoutingModule { }
