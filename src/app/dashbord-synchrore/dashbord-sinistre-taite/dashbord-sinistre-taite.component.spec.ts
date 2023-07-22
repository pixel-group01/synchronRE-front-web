import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordSinistreTaiteComponent } from './dashbord-sinistre-taite.component';

describe('DashbordSinistreTaiteComponent', () => {
  let component: DashbordSinistreTaiteComponent;
  let fixture: ComponentFixture<DashbordSinistreTaiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordSinistreTaiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordSinistreTaiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
