import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerAffaireFacultativeComponent } from './container-affaire-facultative.component';

describe('ContainerAffaireFacultativeComponent', () => {
  let component: ContainerAffaireFacultativeComponent;
  let fixture: ComponentFixture<ContainerAffaireFacultativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerAffaireFacultativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerAffaireFacultativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
