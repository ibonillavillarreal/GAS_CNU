import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPrecioComponent } from './ver-precio.component';

describe('VerPrecioComponent', () => {
  let component: VerPrecioComponent;
  let fixture: ComponentFixture<VerPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
