import { TestBed, inject } from '@angular/core/testing';

import { StepDataService } from './step-data.service';

describe('StepDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepDataService]
    });
  });

  it('should be created', inject([StepDataService], (service: StepDataService) => {
    expect(service).toBeTruthy();
  }));
});
