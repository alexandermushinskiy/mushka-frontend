import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Product } from '../../shared/models/product.model';
import { SizeItem } from '../../shared/models/size-item.model';

@Injectable()
export class ProductsServce {
  private products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  constructor() {
    this.loadProducts();
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable().delay(2000);
  }

  private loadProducts() {
    this.getFakeProducts()
      .subscribe(data => this.products$.next(data));
  }

  private getFakeProducts(): Observable<Product[]> {
    return Observable.of([
      new Product({
        id: 'F1B501FA-14DB-4682-8C53-95D0D8E9DDE8',
        name: 'Festival',
        сode: 'YY231',
        createdOn: '2018-03-01',
        deliveriesNumber: 2,
        lastDeliveryDate: '2018-02-27',
        lastDeliveryCount: 100,
        totalCount: 119,
        sizes: [
          new SizeItem('36-39', 59),
          new SizeItem('41-45', 60)
        ]
      }),
      new Product({
        id: '0402257E-2AE3-4D7F-8E44-E05B0355262C',
        name: 'Good Vibes',
        сode: 'AS123',
        createdOn: '2018-03-01',
        deliveriesNumber: 1,
        lastDeliveryDate: '2018-02-27',
        lastDeliveryCount: 100,
        totalCount: 155,
        sizes: [
          new SizeItem('36-39', 95),
          new SizeItem('41-45', 65)
        ]
      }),
      new Product({
        id: '20819569-183C-4F00-BB80-5634049584B8',
        name: 'Rock',
        сode: 'FF323',
        createdOn: '2018-03-01',
        deliveriesNumber: 1,
        lastDeliveryDate: '2018-02-27',
        lastDeliveryCount: 70,
        totalCount: 31,
        sizes: [
          new SizeItem('36-39', 7),
          new SizeItem('41-45', 24)
        ]
      }),
      new Product({
        id: '1AD228C5-4569-48C4-8367-B1D45D57DD7D',
        name: 'Cactus',
        сode: 'S1D23',
        createdOn: '2018-03-01',
        deliveriesNumber: 2,
        lastDeliveryDate: '2018-02-27',
        lastDeliveryCount: 50,
        totalCount: 15,
        sizes: [
          new SizeItem('36-39', 7),
          new SizeItem('41-45', 8)
        ]
      }),
      new Product({
        id: 'F24CABA2-2D83-4948-A1AA-5A1B1256156C',
        name: 'Sonora',
        сode: 'CC330',
        createdOn: '2018-03-01',
        deliveriesNumber: 1,
        lastDeliveryDate: '2018-02-27',
        lastDeliveryCount: 50,
        totalCount: 10,
        sizes: [
          new SizeItem('36-39', 10),
          new SizeItem('41-45', 0)
        ]
      }),
      new Product({
        id: 'F24CABA2-2D83-4948-A1AA-331B1256156C',
        name: 'Float Party',
        сode: 'FFD10',
        createdOn: '2017-05-11',
        deliveriesNumber: 1,
        lastDeliveryDate: '2018-01-12',
        lastDeliveryCount: 30,
        totalCount: 0,
        sizes: [
          new SizeItem('36-39', 0),
          new SizeItem('41-45', 0)
        ]
      }),
      new Product({
        id: 'F24CABA2-2773-4948-A1AA-331B1256156C',
        name: 'Food Trucks',
        сode: 'FOO76',
        createdOn: '2017-05-11',
        deliveriesNumber: 3,
        lastDeliveryDate: '2018-01-12',
        lastDeliveryCount: 70,
        totalCount: 123,
        sizes: [
          new SizeItem('36-39', 61),
          new SizeItem('41-45', 62)
        ]
      }),
      new Product({
        id: 'F20ABA2-2773-4958-A1AA-331B1256156C',
        name: 'Last Song',
        сode: 'LAS44',
        createdOn: '2017-07-13',
        deliveriesNumber: 1,
        lastDeliveryDate: '2018-02-01',
        lastDeliveryCount: 50,
        totalCount: 72,
        sizes: [
          new SizeItem('36-39', 36),
          new SizeItem('41-45', 36)
        ]
      })
    ]);
  }
}
