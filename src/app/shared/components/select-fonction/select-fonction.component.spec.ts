import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFonctionComponent } from './select-fonction.component';

describe('SelectFonctionComponent', () => {
  let component: SelectFonctionComponent;
  let fixture: ComponentFixture<SelectFonctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFonctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
