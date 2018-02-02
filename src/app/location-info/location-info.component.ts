import { Component, OnChanges, OnInit } from '@angular/core';

import { discountMax, discountMin, inputMaxLength, localStoragePrefix, textareaMaxLength } from '../config';
import { CategoryLocation } from '../category-location';
import { CategoryLocationService } from '../category-location.service';
import { StepDataService } from '../step-data.service';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss']
})
export class LocationInfoComponent implements OnInit, OnChanges {
  inputMaxLength = inputMaxLength;
  textareaMaxLength = textareaMaxLength;
  discountMin = discountMin;
  discountMax = discountMax;

  legalName = 'STAR HOLDING';
  categories: CategoryLocation[];
  sums = [
    { id: 1, name: '150 - 200 Lei' },
    { id: 2, name: '200 - 250 Lei' },
    { id: 3, name: '250 - 300 Lei' }
  ];

  get tradeName() { return this.stepDataService.locationInfoFormGroup.get('tradeName'); }
  get discount() { return this.stepDataService.locationInfoFormGroup.get('discount'); }
  get category() { return this.stepDataService.locationInfoFormGroup.get('category'); }
  get orderSum() { return this.stepDataService.locationInfoFormGroup.get('orderSum'); }
  get roDescription() { return this.stepDataService.locationInfoFormGroup.get('roDescription'); }
  get ruDescription() { return this.stepDataService.locationInfoFormGroup.get('ruDescription'); }

  constructor(public stepDataService: StepDataService, private categoryLocationService: CategoryLocationService) { }

  ngOnInit() {
    this.getCategories();
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

  getCategories() {
    this.categoryLocationService.getCategories().subscribe(categories => this.categories = categories);
  }

  revert() {
    this.ngOnChanges();
  }

  save() {
    localStorage.setItem(`${localStoragePrefix}-step-0`, JSON.stringify(this.stepDataService.locationInfoFormGroup.value));
  }

}
