import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Supplier } from '../../shared/models/supplier.model';

@Injectable()
export class SuppliersService {
  private static fakeSuppliers: Supplier[];
  private suppliers$: BehaviorSubject<Supplier[]> = new BehaviorSubject([]);
  
  constructor() {
    SuppliersService.fakeSuppliers = this.getFakeSuppliers();

    this.loadSuppliers();
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.suppliers$.asObservable().delay(500);
  }

  addSupplier(supplier: Supplier): Observable<Supplier> {
    return this.addSupplierInternal(supplier)
      .map((res: any) => res.data)
      .catch(() => Observable.throw('Ошибка добавление поставщика'))
      .finally(() => this.loadSuppliers());
  }

  private addSupplierInternal(supplier: Supplier): Observable<any> {
    const addedSupplier = new Supplier(Object.assign({}, supplier, {
      id: '11111111-C9B6-4ACF-A478-5185A07C39BF',
      createdOn: '2018-04-05'
    }));

    SuppliersService.fakeSuppliers.push(addedSupplier);
    return Observable.of({data: addedSupplier});
  }

  private loadSuppliers() {
    Observable.of(SuppliersService.fakeSuppliers)
      .subscribe(data => this.suppliers$.next(data));
  }

  private getFakeSuppliers(): Supplier[] {
    return [
      new Supplier({
        id: 'FE5570E0-FE4E-492E-933E-EACD6A31E22D',
        name: 'ТОВ "Новая Линия"',
        address: 'ул. Центральная 11/3, г.Тернополь, УКРАИНА',
        phone: '+380(98)412-1212',
        email: 'info@socks.com',
        webSite: 'socks.com.ua',
        contactPerson: 'Иванов Иван Иванович',
        paymentConditions: 'Наличный, безналичный',
        services: 'Носки',
        comments: ''
      }),
      new Supplier({
        id: 'FE557110-FE4E-492E-933E-EACD6A31E22D',
        name: 'Вова-Зи-Львов',
        address: 'ул. Шевченка 41, г.Львов, УКРАИНА',
        phone: '+380(50)921-7654',
        email: 'hello@vova-zi-lvova.com',
        webSite: 'vova-zi-lvova.com.ua',
        contactPerson: 'Сахаров Владимир Сергеевич',
        paymentConditions: 'Безналичный',
        services: 'Бирки',
        comments: ''
      })
    ];
  }
}
