import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularContactoComponent } from './anular-contacto.component';

describe('AnularContactoComponent', () => {
  let component: AnularContactoComponent;
  let fixture: ComponentFixture<AnularContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnularContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
