import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAgenda } from './eliminar-agenda.component';

describe('ViewItemsComponent', () => {
  let component: EliminarAgenda;
  let fixture: ComponentFixture<EliminarAgenda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarAgenda ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAgenda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
