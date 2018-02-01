import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { discountMax, discountMin, inputMaxLength, textareaMaxLength } from './config';

@Injectable()
export class StepDataService {
  locationInfoFormGroup: FormGroup;

  inputMaxLength = inputMaxLength;
  textareaMaxLength = textareaMaxLength;
  discountMin = discountMin;
  discountMax = discountMax;

  constructor(private formBuilder: FormBuilder) {
    this.locationInfoFormGroup = this.formBuilder.group({
      tradeName: ['', [Validators.required, Validators.maxLength(this.inputMaxLength)]],
      discount: ['', [Validators.required, Validators.min(this.discountMin), Validators.max(this.discountMax)]],
      reservation: [''],
      category: ['', Validators.required],
      orderSum: ['', Validators.required],
      roDescription: ['', [Validators.required, Validators.maxLength(this.textareaMaxLength)]],
      ruDescription: ['', [Validators.required, Validators.maxLength(this.textareaMaxLength)]]
    });
  }

}
