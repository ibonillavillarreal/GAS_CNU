import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSelecPagosComponent } from './car-selec-pagos.component';

describe('CarSelecPagosComponent', () => {
  let component: CarSelecPagosComponent;
  let fixture: ComponentFixture<CarSelecPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarSelecPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSelecPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
