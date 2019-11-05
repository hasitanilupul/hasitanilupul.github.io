import { TestBed } from '@angular/core/testing';

import { AddRateService } from './addrate.service';

describe('AddrateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddRateService = TestBed.get(AddRateService);
    expect(service).toBeTruthy();
  });
});
