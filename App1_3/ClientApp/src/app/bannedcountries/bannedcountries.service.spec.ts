import { TestBed } from '@angular/core/testing';

import { BannedcountriesService } from './bannedcountries.service';

describe('BannedcountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BannedcountriesService = TestBed.get(BannedcountriesService);
    expect(service).toBeTruthy();
  });
});
