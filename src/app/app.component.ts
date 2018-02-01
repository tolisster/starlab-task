import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { localStoragePrefix } from './config';
import { StepDataService } from './step-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;

  phoneMask = ['+', '3', '7', '3', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  lat: number = 51.678418;
  lng: number = 7.809007;

  @ViewChild('stepper') stepper: MatStepper;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private formBuilder: FormBuilder, private stepDataService: StepDataService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.stepDataService.locationInfoFormGroup,
        this.stepDataService.workingHoursFormGroup,
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
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.changeStep(0);
      this.loadDataStep(0);
    }, 0);
  }

  /**
   * Changes the step to the index specified
   * @param {number} index The index of the step
   */
  changeStep(index: number) {
    this.stepper.selectedIndex = index;
  }

  stepperChanged(evt: StepperSelectionEvent) {
    this.loadDataStep(evt.selectedIndex);
  }

  loadDataStep(index: number) {
    const data = localStorage.getItem(`${localStoragePrefix}-step-${index}`);
    if (data) {
      this.formArray.get([index]).setValue(JSON.parse(data));
    }
  }
}
