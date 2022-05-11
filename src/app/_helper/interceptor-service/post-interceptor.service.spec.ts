import { TestBed } from '@angular/core/testing';

import { PostInterceptorService } from './post-interceptor.service';

describe('PostInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostInterceptorService = TestBed.get(PostInterceptorService);
    expect(service).toBeTruthy();
  });
});
