import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelEstadoFacturaComponent } from './del-estado-factura.component';

describe('DelEstadoFacturaComponent', () => {
  let component: DelEstadoFacturaComponent;
  let fixture: ComponentFixture<DelEstadoFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelEstadoFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelEstadoFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
