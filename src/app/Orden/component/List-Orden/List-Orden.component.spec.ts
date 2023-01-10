import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenComponent } from './List-Orden.component';

describe('OrdenComponent', () => {
  let component: OrdenComponent;
  let fixture: ComponentFixture<OrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
