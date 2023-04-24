import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationsSinistreComponent } from './declarations-sinistre.component';

describe('DeclarationsSinistreComponent', () => {
  let component: DeclarationsSinistreComponent;
  let fixture: ComponentFixture<DeclarationsSinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclarationsSinistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationsSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
