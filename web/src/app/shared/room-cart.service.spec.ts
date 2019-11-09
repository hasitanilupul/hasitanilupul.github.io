import { TestBed } from '@angular/core/testing';

import { RoomCartService } from './room-cart.service';

describe('RoomCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomCartService = TestBed.get(RoomCartService);
    expect(service).toBeTruthy();
  });
});
