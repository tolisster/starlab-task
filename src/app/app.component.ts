import { Component, ViewChild, AfterViewInit, OnInit, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

import { CategoryLocation } from './category-location';
import { CategoryLocationService } from './category-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnChanges {
  formGroup: FormGroup;
  locationInfoFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  inputMaxLength = 50;
  textareaMaxLength = 250;
  discountMin = 7;
  discountMax = 100;

  legalName = 'STAR HOLDING';

  get tradeName() { return this.locationInfoFormGroup.get('tradeName'); }
  get discount() { return this.locationInfoFormGroup.get('discount'); }
  get category() { return this.locationInfoFormGroup.get('category'); }
  get orderSum() { return this.locationInfoFormGroup.get('orderSum'); }
  get roDescription() { return this.locationInfoFormGroup.get('roDescription'); }
  get ruDescription() { return this.locationInfoFormGroup.get('ruDescription'); }

  categories: CategoryLocation[];
  sums = [
    { id: 1, name: '150 - 200 Lei' },
    { id: 2, name: '200 - 250 Lei' },
    { id: 3, name: '250 - 300 Lei' }
  ];

  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  workingHours = [
    {fromTime: '10:00', toTime: '23:00', state: 'open'},
    {fromTime: '10:00', toTime: '23:00', state: 'open'},
    {fromTime: '10:00', toTime: '23:00', state: 'open'},
    {fromTime: '10:00', toTime: '23:00', state: 'open'},
    {fromTime: '10:00', toTime: '23:00', state: 'open'},
    {fromTime: '10:00', toTime: '23:00', state: 'open'},
    {fromTime: '10:00', toTime: '23:00', state: 'open'}
  ];

  phoneMask = ['+', '3', '7', '3', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  lat: number = 51.678418;
  lng: number = 7.809007;

  @ViewChild('stepper') stepper: MatStepper;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(
    private formBuilder: FormBuilder,
    private categoryLocationService: CategoryLocationService
  ) { }

  ngOnInit() {
    this.locationInfoFormGroup = this.formBuilder.group({
      tradeName: ['', [Validators.required, Validators.maxLength(this.inputMaxLength)]],
      discount: ['', [Validators.required, Validators.min(this.discountMin), Validators.max(this.discountMax)]],
      reservation: [''],
      category: ['', Validators.required],
      orderSum: ['', Validators.required],
      roDescription: ['', [Validators.required, Validators.maxLength(this.textareaMaxLength)]],
      ruDescription: ['', [Validators.required, Validators.maxLength(this.textareaMaxLength)]]
    });

    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.locationInfoFormGroup,
        this.formBuilder.group({
          //emailFormCtrl: ['', Validators.email]
        }),
        this.formBuilder.group({
          //emailFormCtrl: ['', Validators.email]
        }),
        this.formBuilder.group({
          //emailFormCtrl: ['', Validators.email]
        }),
        this.formBuilder.group({
          //emailFormCtrl: ['', Validators.email]
        }),
        this.formBuilder.group({
          //emailFormCtrl: ['', Validators.email]
        }),
      ])
    });
    this.secondFormGroup = this.formBuilder.group({
      kitchenTags: ['']
    });
    this.getCategories();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.changeStep(0);
    }, 0);
  }

  ngOnChanges() {
    this.locationInfoFormGroup.reset({
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

  /**
   * Changes the step to the index specified
   * @param {number} index The index of the step
   */
  changeStep(index: number) {
    this.stepper.selectedIndex = index;
  }

  revert() {
    this.ngOnChanges();
  }
}
