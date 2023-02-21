import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemSComponent } from './add-itemPuntos.component';

describe('AddItemSComponent', () => {
  let component: AddItemSComponent;
  let fixture: ComponentFixture<AddItemSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
