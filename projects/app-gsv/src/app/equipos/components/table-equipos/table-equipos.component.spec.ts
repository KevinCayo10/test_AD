import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEquiposComponent } from './table-equipos.component';

describe('TableEquiposComponent', () => {
  let component: TableEquiposComponent;
  let fixture: ComponentFixture<TableEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEquiposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
