import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveSinistreComponent } from './archive-sinistre.component';

describe('ArchiveSinistreComponent', () => {
  let component: ArchiveSinistreComponent;
  let fixture: ComponentFixture<ArchiveSinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveSinistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
