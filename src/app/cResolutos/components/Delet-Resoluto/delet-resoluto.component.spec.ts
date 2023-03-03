import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletResolutoComponent } from './delet-resoluto.component';

describe('DeletPrecioComponent', () => {
  let component: DeletResolutoComponent;
  let fixture: ComponentFixture<DeletResolutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletResolutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletResolutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
