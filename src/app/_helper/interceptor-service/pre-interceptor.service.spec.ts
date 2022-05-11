import { TestBed } from '@angular/core/testing';

import { PreInterceptorService } from './pre-interceptor.service';

describe('PreInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreInterceptorService = TestBed.get(PreInterceptorService);
    expect(service).toBeTruthy();
  });
});
