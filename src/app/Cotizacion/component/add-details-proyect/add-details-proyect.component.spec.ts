import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetailsProyectComponent } from './add-details-proyect.component';

describe('AddDetailsProyectComponent', () => {
  let component: AddDetailsProyectComponent;
  let fixture: ComponentFixture<AddDetailsProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDetailsProyectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetailsProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
