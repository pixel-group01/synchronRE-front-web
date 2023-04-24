import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerArchivesComponent } from './container-archives.component';

describe('ContainerArchivesComponent', () => {
  let component: ContainerArchivesComponent;
  let fixture: ComponentFixture<ContainerArchivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerArchivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
