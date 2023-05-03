import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauPlacementComponent } from './tableau-placement.component';

describe('TableauPlacementComponent', () => {
  let component: TableauPlacementComponent;
  let fixture: ComponentFixture<TableauPlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauPlacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
