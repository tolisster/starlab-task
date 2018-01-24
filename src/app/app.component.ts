import {Component, ViewChild, AfterViewInit, OnInit, Inject, LOCALE_ID} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

import { CategoryLocation } from './category-location';
import { CategoryLocationService } from './category-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  categories: CategoryLocation[];
  sumSelected = 2;
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

  languages = ['en', 'ro', 'ru'];

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private _formBuilder: FormBuilder,
    private categoryLocationService: CategoryLocationService,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
        //firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      kitchenTags: ['']
    });
    this.getCategories();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.changeStep(0);
    }, 0);
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
}
