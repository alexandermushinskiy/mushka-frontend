import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Category } from '../../shared/models/category.model';

@Injectable()
export class CategoriesService {
  private static fakeCategories: Category[];
  private categories$: BehaviorSubject<Category[]> = new BehaviorSubject([]);

  constructor() {
    CategoriesService.fakeCategories = this.getFakeCategories();

    this.loadCategories();
  }

  getCategories(): Observable<Category[]> {
    return this.categories$.asObservable().delay(200);
  }

  getById(categoryId: string): Observable<Category> {
    const foundCategory = CategoriesService.fakeCategories
      .find(category => category.id === categoryId)
    return Observable.of(foundCategory).delay(200);
  }

  private loadCategories() {
    Observable.of(CategoriesService.fakeCategories)
      .subscribe(data => this.categories$.next(data));
  }

  private getFakeCategories(): Category[] {
    return [
      new Category({
        id: '88CD0F34-9D4A-4E45-BE97-8899A97FB82C',
        name: 'Носки',
        isSizesRequired: true,
        sizes: ['36-39', '39-42', '41-45', '43-46']
      }),
      new Category({
        id: '0E7BE1DE-267C-4C0A-8EE9-ABA0A267F27A',
        name: 'Упаковка',
        isSizesRequired: true,
        sizes: ['Single', 'Triple', 'Big']
      }),
      new Category({
        id: 'B425D75B-2E72-45F0-A55D-3BA400051E5F',
        name: 'Вспомогательные',
        isSizesRequired: false
      })
    ];
  }
}
