import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResponsableComprasComponent } from './list-responsable-compras.component';

describe('ListResponsableComprasComponent', () => {
  let component: ListResponsableComprasComponent;
  let fixture: ComponentFixture<ListResponsableComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListResponsableComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResponsableComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
