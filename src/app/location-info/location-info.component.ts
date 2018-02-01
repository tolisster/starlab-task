import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { inputMaxLength, textareaMaxLength } from '../config';
import { CategoryLocation } from '../category-location';
import { CategoryLocationService } from '../category-location.service';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss']
})
export class LocationInfoComponent implements OnInit, OnChanges {
  @Input() formGroup: FormGroup;

  inputMaxLength = inputMaxLength;
  textareaMaxLength = textareaMaxLength;
  discountMin = 7;
  discountMax = 100;

  legalName = 'STAR HOLDING';
  categories: CategoryLocation[];
  sums = [
    { id: 1, name: '150 - 200 Lei' },
    { id: 2, name: '200 - 250 Lei' },
    { id: 3, name: '250 - 300 Lei' }
  ];

  get tradeName() { return this.formGroup.get('tradeName'); }
  get discount() { return this.formGroup.get('discount'); }
  get category() { return this.formGroup.get('category'); }
  get orderSum() { return this.formGroup.get('orderSum'); }
  get roDescription() { return this.formGroup.get('roDescription'); }
  get ruDescription() { return this.formGroup.get('ruDescription'); }

  constructor(private formBuilder: FormBuilder, private categoryLocationService: CategoryLocationService) { }

  ngOnInit() {
    this.getCategories();

    this.formGroup = this.formBuilder.group({
      tradeName: ['', [Validators.required, Validators.maxLength(this.inputMaxLength)]],
      discount: ['', [Validators.required, Validators.min(this.discountMin), Validators.max(this.discountMax)]],
      reservation: [''],
      category: ['', Validators.required],
      orderSum: ['', Validators.required],
      roDescription: ['', [Validators.required, Validators.maxLength(this.textareaMaxLength)]],
      ruDescription: ['', [Validators.required, Validators.maxLength(this.textareaMaxLength)]]
    });
  }

  ngOnChanges() {
    this.formGroup.reset({
      tradeName: '',
      discount: '',
      reservation: '',
      category: '',
      orderSum: 2,
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

}
