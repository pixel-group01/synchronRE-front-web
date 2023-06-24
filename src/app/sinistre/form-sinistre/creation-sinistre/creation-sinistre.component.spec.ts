import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationSinistreComponent } from './creation-sinistre.component';

describe('CreationSinistreComponent', () => {
  let component: CreationSinistreComponent;
  let fixture: ComponentFixture<CreationSinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationSinistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
