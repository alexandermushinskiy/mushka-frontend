import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { delay } from 'rxjs/operator/delay';

import { Category } from '../../shared/models/category.model';
import { GuidGenerator } from '../guid-generator/guid.generator';

@Injectable()
export class CategoriesService {
  private static fakeCategories: Category[];
  private categories$: BehaviorSubject<Category[]> = new BehaviorSubject([]);

  constructor() {
    CategoriesService.fakeCategories = this.getFakeCategories();

    this.loadCategories();
  }

  getCategories(): Observable<Category[]> {
    return this.categories$.asObservable();
  }

  getById(categoryId: string): Observable<Category> {
    const foundCategory = CategoriesService.fakeCategories
      .find(category => category.id === categoryId)
    return Observable.of(foundCategory).delay(500);
  }

  create(category: Category): Observable<Category> {
    return this.addCategoryInternal(category)
      .map((res: any) => res.data)
      .catch(() => Observable.throw('Ошибка при добавлении категории'))
      .delay(2000)
      .finally(() => this.loadCategories());
  }

  update(category: Category): Observable<Category> {
    return this.updateCategoryInternal(category)
      .map((res: any) => res.data)
      .catch(() => Observable.throw('Ошибка при редактировании категории'))
      .delay(2000)
      .finally(() => this.loadCategories());
  }

  delete(categoryId: string): Observable<Category> {
    return this.deleteCategoryInternal(categoryId)
      .catch(() => Observable.throw('Ошибка при удалении категории'))
      .delay(2000)
      .finally(() => this.loadCategories());
  }

  private loadCategories() {
    Observable.of(CategoriesService.fakeCategories)
      .subscribe(data => this.categories$.next(data));
  }

  private addCategoryInternal(category: Category): Observable<any> {
    const newCategory = new Category(Object.assign({}, category, {
      id: GuidGenerator.newGuid()
    }));

    Observable.of(CategoriesService.fakeCategories)
      .delay(2000)
      .subscribe(data => data.push(newCategory));

    return Observable.of({data: newCategory});
  }

  private updateCategoryInternal(category: Category): Observable<any> {
    let storedCategory = CategoriesService.fakeCategories.find(cat => cat.id === category.id);

    Observable.of(CategoriesService.fakeCategories)
      .delay(2000)
      .subscribe(() => {
        storedCategory = Object.assign(storedCategory, category);
      });

    return Observable.of({data: storedCategory});
  }

  private deleteCategoryInternal(categoryId: string): Observable<any> {
    Observable.of(CategoriesService.fakeCategories)
      .delay(2000)
      .subscribe(data => {
        const index = data.findIndex(cat => cat.id === categoryId);
        data.splice(index, 1);
      });

    return Observable.of({data: categoryId});
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
