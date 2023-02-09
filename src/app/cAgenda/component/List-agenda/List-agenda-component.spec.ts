import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCotizacionComponent } from './List-Agenda.component';

describe('DetalleCotizacionComponentComponent', () => {
  let component: ListCotizacionComponent;
  let fixture: ComponentFixture<ListCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
