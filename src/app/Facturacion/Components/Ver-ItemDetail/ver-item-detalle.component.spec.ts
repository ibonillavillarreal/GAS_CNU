import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerItemDetalleComponent } from './ver-item-detalle.component';

describe('VerItemDetalleComponent', () => {
  let component: VerItemDetalleComponent;
  let fixture: ComponentFixture<VerItemDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerItemDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerItemDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
