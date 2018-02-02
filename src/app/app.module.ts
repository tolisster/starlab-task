import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TextMaskModule } from 'angular2-text-mask';
import { AgmCoreModule } from '@agm/core';
import { ImageUploadModule } from 'angular2-image-upload';

import { InMemoryDataService } from './in-memory-data.service';
import { AppComponent } from './app.component';
import { CategoryLocationService } from './category-location.service';
import { WorkingHoursComponent } from './working-hours/working-hours.component';
import { LocationInfoComponent } from './location-info/location-info.component';
import { AppMaterialModule } from './material.module';
import { TagsInputComponent } from './tags-input/tags-input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StepDataService } from './step-data.service';
import { ContactDataComponent } from './contact-data/contact-data.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkingHoursComponent,
    LocationInfoComponent,
    TagsInputComponent,
    NavbarComponent,
    ContactDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBk7E9kBo0q9yy9PYPbD_WxKlBN77x6tvo'
    }),
    ImageUploadModule.forRoot(),
    AppMaterialModule,
    TextMaskModule
  ],
  providers: [
      CategoryLocationService,
      StepDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
