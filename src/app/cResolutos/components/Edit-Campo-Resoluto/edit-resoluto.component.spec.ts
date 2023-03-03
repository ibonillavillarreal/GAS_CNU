import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResolutoComponent } from './edit-resoluto.component';

describe('EditPrecioComponent', () => {
  let component: EditResolutoComponent;
  let fixture: ComponentFixture<EditResolutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResolutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResolutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
