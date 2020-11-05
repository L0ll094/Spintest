import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindQComponent } from './find-q.component';

describe('FindQComponent', () => {
  let component: FindQComponent;
  let fixture: ComponentFixture<FindQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
