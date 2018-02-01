import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;
  locationInfoFormGroup: FormGroup;

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
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
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.changeStep(0);
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
    console.log('test', this.formArray.get([evt.previouslySelectedIndex]));
  }
}
