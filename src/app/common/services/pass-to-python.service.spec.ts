import { TestBed } from '@angular/core/testing';

import { PassToPythonService } from './pass-to-python.service';

describe('PassToPythonService', () => {
  let service: PassToPythonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassToPythonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
