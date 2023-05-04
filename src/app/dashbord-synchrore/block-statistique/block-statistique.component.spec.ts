import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockStatistiqueComponent } from './block-statistique.component';

describe('BlockStatistiqueComponent', () => {
  let component: BlockStatistiqueComponent;
  let fixture: ComponentFixture<BlockStatistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockStatistiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockStatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
