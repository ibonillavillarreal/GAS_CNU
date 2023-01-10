import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguirTrackComponent } from './seguir-track.component';

describe('SeguirTrackComponent', () => {
  let component: SeguirTrackComponent;
  let fixture: ComponentFixture<SeguirTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguirTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguirTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
