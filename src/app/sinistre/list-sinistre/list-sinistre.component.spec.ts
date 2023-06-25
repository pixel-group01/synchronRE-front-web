import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSinistreComponent } from './list-sinistre.component';

describe('ListSinistreComponent', () => {
  let component: ListSinistreComponent;
  let fixture: ComponentFixture<ListSinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSinistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
