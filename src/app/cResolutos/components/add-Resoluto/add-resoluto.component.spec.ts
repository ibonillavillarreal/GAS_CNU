import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResolutoComponent } from './add-resoluto.component';

describe('AddPrecioComponent', () => {
  let component: AddResolutoComponent;
  let fixture: ComponentFixture<AddResolutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResolutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResolutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
