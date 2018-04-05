import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Supplier } from '../../shared/models/supplier.model';

@Injectable()
export class SuppliersService {

  getSuppliers(): Observable<Supplier[]> {
    return this.getFakeSuppliers().delay(1000);
  }

  private getFakeSuppliers() {
    return Observable.of([
      new Supplier({
        id: 'FE5570E0-FE4E-492E-933E-EACD6A31E22D',
        name: 'ТОВ "Новая Линия"',
        address: 'ул. Центральная 11/3, г.Тернополь, УКРАИНА',
        phone: '+380(98)412-1212',
        email: 'info@socks.com',
        webSite: 'socks.com.ua',
        contactPerson: 'Иванов Иван Иванович',
        paymentCondition: 'Наличный, безналичный',
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
        paymentCondition: 'Безналичный',
        services: 'Бирки',
        comments: ''
      })
    ]);
  }
}
