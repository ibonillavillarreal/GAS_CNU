import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrecioComponent } from './edit-precio.component';

describe('EditPrecioComponent', () => {
  let component: EditPrecioComponent;
  let fixture: ComponentFixture<EditPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
