import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAffaireFacultativeComponent } from './details-affaire-facultative.component';

describe('DetailsAffaireFacultativeComponent', () => {
  let component: DetailsAffaireFacultativeComponent;
  let fixture: ComponentFixture<DetailsAffaireFacultativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAffaireFacultativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAffaireFacultativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
