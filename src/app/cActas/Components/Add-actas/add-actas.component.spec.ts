import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Add_ActasComponent } from './add-actas.component';

describe('AddFacturaComponent', () => {
  let component: Add_ActasComponent;
  let fixture: ComponentFixture<Add_ActasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Add_ActasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Add_ActasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
