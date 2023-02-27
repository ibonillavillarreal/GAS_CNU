import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularPersonaComponent } from './anular-persona.component';

describe('AnularClienteComponent', () => {
  let component: AnularPersonaComponent;
  let fixture: ComponentFixture<AnularPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnularPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
