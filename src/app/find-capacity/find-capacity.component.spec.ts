import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCapacityComponent } from './find-capacity.component';

describe('FindCapacityComponent', () => {
  let component: FindCapacityComponent;
  let fixture: ComponentFixture<FindCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
