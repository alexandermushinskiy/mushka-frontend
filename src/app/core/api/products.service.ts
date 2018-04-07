import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Product } from '../../shared/models/product.model';
import { SizeItem } from '../../shared/models/size-item.model';

@Injectable()
export class ProductsServce {
  private static fakeProducts: Product[];
  private products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  constructor() {
    ProductsServce.fakeProducts = this.getFakeProducts();

    this.loadProducts();
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable().delay(1000);
  }

  addProduct(product: Product): Observable<Product> {
    return this.addProductInternal(product)
      .map((res: any) => res.data)
      .catch(() => Observable.throw('Ошибка добавление товара'))
      .finally(() => this.loadProducts());
  }

  private addProductInternal(product: Product): Observable<any> {
    const addedProduct = Object.assign({}, product, {
      id: '11111111-C9B6-4ACF-A478-5185A07C39BF',
      createdOn: '2018-04-05',
      totalCount: 0
    });

    ProductsServce.fakeProducts.push(addedProduct);
    return Observable.of({data: addedProduct});
  }

  private loadProducts() {
    Observable.of(ProductsServce.fakeProducts)
      .subscribe(data => this.products$.next(data));
  }

  private getFakeProducts(): Product[] {
    return [
      new Product({
        id: 'F1B501FA-14DB-4682-8C53-95D0D8E9DDE8',
        name: 'Festival',
        code: 'YY231',
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
        code: 'AS123',
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
        code: 'FF323',
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
        code: 'S1D23',
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
        code: 'CC330',
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
        code: 'FFD10',
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
        code: 'FOO76',
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
        code: 'LAS44',
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
    ];
  }
}
