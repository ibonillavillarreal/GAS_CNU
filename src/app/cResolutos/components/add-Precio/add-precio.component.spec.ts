import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrecioComponent } from './add-precio.component';

describe('AddPrecioComponent', () => {
  let component: AddPrecioComponent;
  let fixture: ComponentFixture<AddPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
