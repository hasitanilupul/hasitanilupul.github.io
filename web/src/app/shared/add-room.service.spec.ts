import { TestBed } from '@angular/core/testing';

import { AddRoomService } from './add-room.service';

describe('AddRoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddRoomService = TestBed.get(AddRoomService);
    expect(service).toBeTruthy();
  });
});
