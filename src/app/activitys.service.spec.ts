import { TestBed } from '@angular/core/testing';

import { ActivitysService } from './activitys.service';

describe('ActivitysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivitysService = TestBed.get(ActivitysService);
    expect(service).toBeTruthy();
  });
});
