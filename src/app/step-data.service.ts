import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { discountMax, discountMin, inputMaxLength, textareaMaxLength } from './config';

@Injectable()
export class StepDataService {
  locationInfoFormGroup: FormGroup;
  workingHoursFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.locationInfoFormGroup = this.formBuilder.group({
      tradeName: ['', [Validators.required, Validators.maxLength(inputMaxLength)]],
      discount: [null, [Validators.required, Validators.min(discountMin), Validators.max(discountMax)]],
      reservation: false,
      category: [null, Validators.required],
      orderSum: [null, Validators.required],
      roDescription: ['', [Validators.required, Validators.maxLength(textareaMaxLength)]],
      ruDescription: ['', [Validators.required, Validators.maxLength(textareaMaxLength)]]
    });

    const workingHourFormGroups = [];
    for (let i = 0; i < 7; i++) {
      workingHourFormGroups.push(this.formBuilder.group({fromTime: '10:00', toTime: '23:00', state: 'open'}));
    }
    this.workingHoursFormGroup = this.formBuilder.group({
      formArray: this.formBuilder.array(workingHourFormGroups)
    });
  }

}
