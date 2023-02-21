import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarItemAddComponent } from './car-item-add.component';

describe('CarItemAddComponent', () => {
  let component: CarItemAddComponent;
  let fixture: ComponentFixture<CarItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarItemAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
