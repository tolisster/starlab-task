import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';

import { StepDataService } from '../step-data.service';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss']
})
export class WorkingHoursComponent implements OnInit {
  weekDays: string[];

  get formArray(): FormArray { return this.stepDataService.workingHoursFormGroup.get('formArray') as FormArray; }

  static getWeekdayNameArray(locale: string) {
    const weekDays = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date(2000, 0, i + 2); // 2 added to start week array on a sunday
      const weekDay = date.toLocaleString(locale, { weekday: 'long' });
      weekDays.push(weekDay);
    }
    return weekDays;
  }

  constructor(public stepDataService: StepDataService, @Inject(LOCALE_ID) locale: string) {
    this.weekDays = WorkingHoursComponent.getWeekdayNameArray(locale);
  }

  ngOnInit() {
  }

}
