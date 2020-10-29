import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSpintimesComponent } from './find-spintimes.component';

describe('FindSpintimesComponent', () => {
  let component: FindSpintimesComponent;
  let fixture: ComponentFixture<FindSpintimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindSpintimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSpintimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
