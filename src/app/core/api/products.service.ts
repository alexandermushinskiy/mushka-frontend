import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Product } from '../../shared/models/product.model';

@Injectable()
export class ProductsServce {
  private products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  constructor() {
    this.loadProducts();
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable().delay(3000);
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
        vendorCode: 'YY231',
        createdOn: '2018-03-01',
        deliveriesNumber: 2,
        lastDeliveryDate: '2018-02-27',
        lastDeliveryCount: 100,
        totalCount: 119,
        sizes: ['36-39', '41-45']
      }),
      new Product({
        id: '0402257E-2AE3-4D7F-8E44-E05B0355262C',
        name: 'Good Vibes',
        vendorCode: 'AS123',
        createdOn: '2018-03-01',
        deliveriesNumber: 1,
        lastDeliveryDate: '2018-02-27',
        lastDeliveryCount: 100,
        totalCount: 155,
        sizes: ['36-39', '41-45']
      }),
      new Product({
        id: '20819569-183C-4F00-BB80-5634049584B8',
        name: 'Rock',
        vendorCode: 'FF323',
        createdOn: '2018-03-01',
        deliveriesNumber: 1,
        lastDeliveryDate: '2018-02-27',
        lastDeliveryCount: 70,
        totalCount: 86,
        sizes: ['36-39', '41-45']
      }),
      new Product({
        id: '1AD228C5-4569-48C4-8367-B1D45D57DD7D',
        name: 'Cactus',
        vendorCode: 'S1D23',
        createdOn: '2018-03-01',
        deliveriesNumber: 2,
        lastDeliveryDate: '2018-02-27',
        lastDeliveryCount: 50,
        totalCount: 55,
        sizes: ['36-39', '41-45']
      }),
      new Product({
        id: 'F24CABA2-2D83-4948-A1AA-5A1B1256156C',
        name: 'Sonora',
        vendorCode: 'CC330',
        createdOn: '2018-03-01',
        deliveriesNumber: 1,
        lastDeliveryDate: '2018-02-27',
        lastDeliveryCount: 50,
        totalCount: 30,
        sizes: ['36-39', '41-45']
      }),
    ]);
  }
}
