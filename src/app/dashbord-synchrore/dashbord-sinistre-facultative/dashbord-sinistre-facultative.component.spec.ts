import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordSinistreFacultativeComponent } from './dashbord-sinistre-facultative.component';

describe('DashbordSinistreFacultativeComponent', () => {
  let component: DashbordSinistreFacultativeComponent;
  let fixture: ComponentFixture<DashbordSinistreFacultativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordSinistreFacultativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordSinistreFacultativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
