import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularClienteComponent } from './anular-persona.component';

describe('AnularClienteComponent', () => {
  let component: AnularClienteComponent;
  let fixture: ComponentFixture<AnularClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnularClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
