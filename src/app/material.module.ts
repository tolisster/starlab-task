import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatStepperModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatStepperModule,
  ],
  providers: [
  ]
})
export class AppMaterialModule { }
