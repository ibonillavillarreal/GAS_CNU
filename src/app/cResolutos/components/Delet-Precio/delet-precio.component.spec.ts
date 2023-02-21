import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletPrecioComponent } from './delet-precio.component';

describe('DeletPrecioComponent', () => {
  let component: DeletPrecioComponent;
  let fixture: ComponentFixture<DeletPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
