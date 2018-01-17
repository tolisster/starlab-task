import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { CategoryLocation } from './category-location';

@Injectable()
export class CategoryLocationService {

  private categoriesUrl = 'api/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryLocation[]> {
    return this.http.get<CategoryLocation[]>(this.categoriesUrl);
  }

}
