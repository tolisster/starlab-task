import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { discountMax, discountMin, inputMaxLength, textareaMaxLength } from './config';

@Injectable()
export class StepDataService {
  formGroup: FormGroup;
  locationInfoFormGroup: FormGroup;
  workingHoursFormGroup: FormGroup;
  contactDataFormGroup: FormGroup;

  private localStoragePrefix = 'starlab-task';

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

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

    this.contactDataFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(inputMaxLength)]],
      lastName: ['', [Validators.required, Validators.maxLength(inputMaxLength)]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required, Validators.maxLength(inputMaxLength)]],
      city: ['', [Validators.required, Validators.maxLength(inputMaxLength)]],
      street: ['', [Validators.required, Validators.maxLength(inputMaxLength)]],
      postCode: ['', [Validators.required, Validators.maxLength(inputMaxLength)]],
    });

    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.locationInfoFormGroup,
        this.workingHoursFormGroup,
        this.contactDataFormGroup,
        this.formBuilder.group({}),
        this.formBuilder.group({}),
        this.formBuilder.group({}),
      ])
    });
  }

  save(index: number) {
    localStorage.setItem(`${this.localStoragePrefix}-step-${index}`, JSON.stringify(this.formArray.get([index]).value));
  }

  load(index: number) {
    const data = localStorage.getItem(`${this.localStoragePrefix}-step-${index}`);
    if (data) {
      this.formArray.get([index]).setValue(JSON.parse(data));
    }
  }

}
