import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSinistreComponent } from './container-sinistre.component';

describe('ContainerSinistreComponent', () => {
  let component: ContainerSinistreComponent;
  let fixture: ComponentFixture<ContainerSinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerSinistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
