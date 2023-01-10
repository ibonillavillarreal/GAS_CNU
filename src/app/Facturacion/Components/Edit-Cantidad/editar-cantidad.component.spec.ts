import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCantidadComponent } from './editar-cantidad.component';

describe('EditarCantidadComponent', () => {
  let component: EditarCantidadComponent;
  let fixture: ComponentFixture<EditarCantidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCantidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
