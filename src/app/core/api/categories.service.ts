import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Category } from '../../shared/models/category.model';

@Injectable()
export class CategoriesService {
  private categories$: BehaviorSubject<Category[]> = new BehaviorSubject([]);

  constructor() {
    this.loadCategories();
  }

  getCategories(): Observable<Category[]> {
    return this.categories$.asObservable().delay(200);
  }

  private loadCategories() {
    this.getFakeCategories()
      .subscribe(data => this.categories$.next(data));
  }

  private getFakeCategories(): Observable<Category[]> {
    return Observable.of([
      new Category({
        id: '400F9E05-FD3F-449E-B252-5D59265ADD69',
        name: 'Носки',
        sizes: ['36-39', '39-42', '41-45', '43-46']
      }),
      new Category({
        id: '123F9E05-FD3F-449E-B252-5D59265ADD00',
        name: 'Упаковка',
        sizes: ['Single', 'Triple', 'Big']
      })
    ]);
  }
}
