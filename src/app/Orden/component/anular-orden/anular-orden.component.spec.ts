import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularOrdenComponent } from './anular-orden.component';

describe('AnularOrdenComponent', () => {
  let component: AnularOrdenComponent;
  let fixture: ComponentFixture<AnularOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnularOrdenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
