import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAgendaComponent } from './List-Agenda.component';

describe('DetalleCotizacionComponentComponent', () => {
  let component: ListAgendaComponent;
  let fixture: ComponentFixture<ListAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
