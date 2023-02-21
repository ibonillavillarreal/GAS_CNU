import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCotizacionComponent } from './delete-cotizacion.component';

describe('DeleteCotizacionComponent', () => {
  let component: DeleteCotizacionComponent;
  let fixture: ComponentFixture<DeleteCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
