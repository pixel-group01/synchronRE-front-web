import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFonctionComponent } from './add-new-fonction.component';

describe('AddNewFonctionComponent', () => {
  let component: AddNewFonctionComponent;
  let fixture: ComponentFixture<AddNewFonctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewFonctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
