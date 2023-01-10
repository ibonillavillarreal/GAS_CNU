import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfilaUsoCantidadComponent } from './editfila-uso-cantidad.component';

describe('EditfilaUsoCantidadComponent', () => {
  let component: EditfilaUsoCantidadComponent;
  let fixture: ComponentFixture<EditfilaUsoCantidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditfilaUsoCantidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfilaUsoCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
