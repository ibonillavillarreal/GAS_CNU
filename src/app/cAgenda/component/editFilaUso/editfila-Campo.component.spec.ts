import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditafilaCampoComponent } from './editfila-Campo.component';

describe('EditfilaUsoCantidadComponent', () => {
  let component: EditafilaCampoComponent;
  let fixture: ComponentFixture<EditafilaCampoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditafilaCampoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditafilaCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
