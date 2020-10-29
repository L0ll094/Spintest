import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetCriteriaComponent } from './meet-criteria.component';

describe('MeetCriteriaComponent', () => {
  let component: MeetCriteriaComponent;
  let fixture: ComponentFixture<MeetCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
