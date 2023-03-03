import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerResolutoComponent } from './ver-Resoluto.component';

describe('VerPrecioComponent', () => {
  let component: VerResolutoComponent;
  let fixture: ComponentFixture<VerResolutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerResolutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerResolutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
