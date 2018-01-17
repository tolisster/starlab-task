import { TestBed, inject } from '@angular/core/testing';

import { CategoryLocationService } from './category-location.service';

describe('CategoryLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryLocationService]
    });
  });

  it('should be created', inject([CategoryLocationService], (service: CategoryLocationService) => {
    expect(service).toBeTruthy();
  }));
});
