import { TestBed } from '@angular/core/testing';

import { OnlineSearchService } from './online-search.service';

describe('OnlineSearchService', () => {
  let service: OnlineSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
