import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrdenComponent } from './detail-orden.component';

describe('DetailOrdenComponent', () => {
  let component: DetailOrdenComponent;
  let fixture: ComponentFixture<DetailOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOrdenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
