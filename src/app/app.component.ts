import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { StepDataService } from './step-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.stepDataService.formGroup.get('formArray'); }

  constructor(public stepDataService: StepDataService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.stepDataService.load(0);
      /*setTimeout(() => {
        this.changeStep(0);
      }, 0);*/
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
    this.stepDataService.load(evt.selectedIndex);
  }
}
