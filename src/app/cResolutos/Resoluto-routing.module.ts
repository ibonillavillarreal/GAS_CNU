import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { List_ResolutoComponent } from './components/List-Resoluto/List-precios.component';

const routes: Routes = [
  {
    path: '',
    component:List_ResolutoComponent,
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
export class Resoluto_RoutingModule { 
  
}
