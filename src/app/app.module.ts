
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//
import { InterceptorService } from './interceptors/interceptor.service';
import { SharedModule } from './shared/Material.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
//
import { CotizacionModule } from './Cotizacion/Cotizacion.module';
import { OrdenModule } from './Orden/orden.module';
import { PreciosModule } from './Precios/precios.module';
import { FacturaModule } from './Facturacion/factura.module';
//import { ListFacturaComponent } from './Facturacion/Components/List-factura/list-factura.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule,
    MatProgressSpinnerModule,
    CotizacionModule,
    OrdenModule,
    PreciosModule,
    FacturaModule
    
  ],

  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService, 
      multi: true 
    } 

  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
