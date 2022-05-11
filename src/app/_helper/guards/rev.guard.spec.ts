import { TestBed } from '@angular/core/testing';

import { RevGuard } from './rev.guard';

describe('RevGuard', () => {
  let guard: RevGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RevGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
