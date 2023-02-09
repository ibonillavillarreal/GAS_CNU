import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCotizacionProyectoComponent } from './details-cotizacion-proyecto.component';

describe('DetailsCotizacionProyectoComponent', () => {
  let component: DetailsCotizacionProyectoComponent;
  let fixture: ComponentFixture<DetailsCotizacionProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCotizacionProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCotizacionProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
