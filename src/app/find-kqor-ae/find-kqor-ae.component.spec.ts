import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindKQorAeComponent } from './find-kqor-ae.component';

describe('FindKQorAeComponent', () => {
  let component: FindKQorAeComponent;
  let fixture: ComponentFixture<FindKQorAeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindKQorAeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindKQorAeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
