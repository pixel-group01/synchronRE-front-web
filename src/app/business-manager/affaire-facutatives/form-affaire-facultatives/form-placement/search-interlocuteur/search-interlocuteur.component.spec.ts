import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInterlocuteurComponent } from './search-interlocuteur.component';

describe('SearchInterlocuteurComponent', () => {
  let component: SearchInterlocuteurComponent;
  let fixture: ComponentFixture<SearchInterlocuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInterlocuteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInterlocuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
