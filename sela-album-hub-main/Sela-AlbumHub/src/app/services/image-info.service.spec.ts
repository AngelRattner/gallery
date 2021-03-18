import { TestBed } from '@angular/core/testing';

import { ImageInfoService } from './image-info.service';

describe('ImageInfoService', () => {
  let service: ImageInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
