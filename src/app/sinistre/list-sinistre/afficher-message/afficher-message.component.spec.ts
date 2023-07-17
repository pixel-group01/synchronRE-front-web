import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherMessageComponent } from './afficher-message.component';

describe('AfficherMessageComponent', () => {
  let component: AfficherMessageComponent;
  let fixture: ComponentFixture<AfficherMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
