import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFacturaComponent } from './detail-factura.component';

describe('DetailFacturaComponent', () => {
  let component: DetailFacturaComponent;
  let fixture: ComponentFixture<DetailFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
