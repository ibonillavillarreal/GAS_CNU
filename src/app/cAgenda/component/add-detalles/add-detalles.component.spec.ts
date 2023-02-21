import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetailsProyectComponent as AddDetallesComponent } from './add-detalles.component';

describe('AddDetailsProyectComponent', () => {
  let component: AddDetallesComponent;
  let fixture: ComponentFixture<AddDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDetallesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
