import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterlocuteursComponent } from './interlocuteurs.component';

describe('InterlocuteursComponent', () => {
  let component: InterlocuteursComponent;
  let fixture: ComponentFixture<InterlocuteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterlocuteursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterlocuteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
