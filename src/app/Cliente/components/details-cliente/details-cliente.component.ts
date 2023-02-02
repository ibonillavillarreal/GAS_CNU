import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SP_Cliente_Get_W } from 'src/app/models/SP_Cliente_Get_W';
import { ClienteService } from 'src/app/services/cliente.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { PaisService } from 'src/app/services/pais.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';

@Component({
  selector: 'app-details-cliente',
  templateUrl: './details-cliente.component.html',
  styleUrls: ['./details-cliente.component.css']
})
export class DetailsClienteComponent implements OnInit {
  
  id!: number;
  public Contacto1: any;
  public Contacto2: any;

  public name: string = " INTEGRANTES";
  datos: any;
  tools: GlobalUtilities
  public index: number = 0;

  constructor(private Aroute: ActivatedRoute, private src: ClienteService, private route: Router,
    private srcDepartamento: DepartamentoService, private srcMunicipio: MunicipioService, 
    private srcPais: PaisService) 
    {
      this.tools = GlobalUtilities.getInstance();
    }

  ngOnInit(): void {

    this.Aroute.params.subscribe((params: Params) => {
      this.id = params.id;
    })
    this.fill_data();

    setTimeout(() => {
      this.tools.setisLoadingDetails(false);
    }, 450)
  }
  
  redirect_to_contacts(type: number) {
    this.name = this.datos[0].nombre_cliente;
    this.route.navigate(['Clientes/' + this.id + '/' + type + '/' + this.name])
  }

  async fill_data() {    
    this.tools.setisLoadingDetails(true);    
    this.datos = await this.src.getCliente(this.id).toPromise();
    
    this.Contacto1 = this.datos[0];
    this.Contacto2 = this.datos[1];

    console.log('this.datos[0] : ' ,JSON.stringify(this.datos[1]));
  }


  /****ANIMACION ****/
  isLoading() {
    return this.tools.getisLoadingDetails();
  }
}
