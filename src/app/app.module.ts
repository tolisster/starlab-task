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
import { AppMaterialModule } from './material.module';
import { TagsInputComponent } from './tags-input/tags-input.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TagsInputComponent,
    NavbarComponent
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
      CategoryLocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
