import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCotizacionComponent } from './details-cotizacion.component';

describe('DetailsCotizacionComponent', () => {
  let component: DetailsCotizacionComponent;
  let fixture: ComponentFixture<DetailsCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
