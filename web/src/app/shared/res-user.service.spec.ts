import { TestBed } from '@angular/core/testing';

import { ResUserService } from './res-user.service';

describe('ResUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResUserService = TestBed.get(ResUserService);
    expect(service).toBeTruthy();
  });
});
