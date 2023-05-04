import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordSynchroreComponent } from './dashbord-synchrore.component';

describe('DashbordSynchroreComponent', () => {
  let component: DashbordSynchroreComponent;
  let fixture: ComponentFixture<DashbordSynchroreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordSynchroreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordSynchroreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
