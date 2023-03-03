import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/cliente.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { ClaustroService } from 'src/app/services/municipio.service';
import { CargoService } from 'src/app/services/Cargo.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';

@Component({
  selector: 'app-details-persona',
  templateUrl: './details-persona.component.html',
  styleUrls: ['./details-persona.component.css']
})
export class DetailsPersonaComponent implements OnInit {

  id!: number;
  public Persona: any;

  public name: string = " INTEGRANTES";
  datos: any;
  tools: GlobalUtilities
  

  constructor(private Aroute: ActivatedRoute, private src: PersonaService, private route: Router,
    private srcDepartamento: DepartamentoService, private srcMunicipio: ClaustroService,
    private srcPais: CargoService) {
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

  redirect_to_contacts() {
    this.name = this.datos[0].Nombres;
    this.route.navigate(['Personas'])
  }

  async fill_data() {
    this.tools.setisLoadingDetails(true);
    this.datos = await this.src.getPersona(this.id).toPromise();
    this.Persona = this.datos[0];
  }
  

  /****ANIMACION ****/
  isLoading() {
    return this.tools.getisLoadingDetails();
  }
}
