import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordAffaireFacultativeComponent } from './dashbord-affaire-facultative.component';

describe('DashbordAffaireFacultativeComponent', () => {
  let component: DashbordAffaireFacultativeComponent;
  let fixture: ComponentFixture<DashbordAffaireFacultativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordAffaireFacultativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordAffaireFacultativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
