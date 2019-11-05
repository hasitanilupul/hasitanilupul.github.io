import { TestBed } from '@angular/core/testing';

import { AddfoodService } from './addfood.service';

describe('AddfoodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddfoodService = TestBed.get(AddfoodService);
    expect(service).toBeTruthy();
  });
});
