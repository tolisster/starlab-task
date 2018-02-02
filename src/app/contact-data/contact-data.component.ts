import { Component, OnChanges, OnInit } from '@angular/core';

import { inputMaxLength } from '../config';
import { StepDataService } from '../step-data.service';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss']
})
export class ContactDataComponent implements OnInit, OnChanges {
  inputMaxLength = inputMaxLength;

  phoneMask = ['+', '3', '7', '3', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  lat = 51.678418;
  lng = 7.809007;

  constructor(public stepDataService: StepDataService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.stepDataService.locationInfoFormGroup.reset({
      tradeName: '',
      discount: null,
      reservation: false,
      category: null,
      orderSum: null,
      roDescription: '',
      ruDescription: ''
    });
  }

  revert() {
    this.ngOnChanges();
  }

  save() {
    this.stepDataService.save(2);
  }

}
