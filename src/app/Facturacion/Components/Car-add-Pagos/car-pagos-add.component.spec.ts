import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPagosAddComponent } from './car-pagos-add.component';

describe('CarPagosAddComponent', () => {
  let component: CarPagosAddComponent;
  let fixture: ComponentFixture<CarPagosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPagosAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPagosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
