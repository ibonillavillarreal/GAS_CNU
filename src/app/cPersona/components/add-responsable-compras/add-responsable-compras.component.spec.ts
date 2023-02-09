import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResponsableComprasComponent } from './add-responsable-compras.component';

describe('AddResponsableComprasComponent', () => {
  let component: AddResponsableComprasComponent;
  let fixture: ComponentFixture<AddResponsableComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResponsableComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResponsableComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
