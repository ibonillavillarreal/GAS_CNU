import { ComponentFixture, TestBed } from '@angular/core/testing';

import { List_ResolutoComponent} from './List-precios.component';

describe('PreciosComponent', () => {
  let component: List_ResolutoComponent;
  let fixture: ComponentFixture<List_ResolutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ List_ResolutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(List_ResolutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
