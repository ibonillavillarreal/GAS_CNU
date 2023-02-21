import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAgendaComponent } from './details-agenda.component';

describe('DetailsCotizacionComponent', () => {
  let component: DetailsAgendaComponent;
  let fixture: ComponentFixture<DetailsAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
