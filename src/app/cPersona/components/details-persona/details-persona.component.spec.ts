import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPersonaComponent } from './details-cliente.component';

describe('DetailsClienteComponent', () => {
  let component: DetailsPersonaComponent;
  let fixture: ComponentFixture<DetailsPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
