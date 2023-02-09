import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddItemsComponent } from './view-add-items.component';

describe('ViewAddItemsComponent', () => {
  let component: ViewAddItemsComponent;
  let fixture: ComponentFixture<ViewAddItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAddItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAddItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
