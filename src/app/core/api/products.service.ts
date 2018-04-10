import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Product } from '../../shared/models/product.model';
import { SizeItem } from '../../shared/models/size-item.model';
import { Category } from '../../shared/models/category.model';

@Injectable()
export class ProductsServce {
  private static fakeProducts: Product[];
  private categoryProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  constructor() {
    ProductsServce.fakeProducts = this.getFakeProducts();
  }

  getProducts(criteria: string): Observable<Product[]> {
    const fountProducts = ProductsServce.fakeProducts
      .filter(prod => prod.name.toLowerCase().includes(criteria.toLowerCase()) || 
                      prod.code.toLowerCase().includes(criteria.toLowerCase()));

    return Observable.of(fountProducts)
      .delay(300);
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    this.loadCategoryProducts(categoryId);

    return this.categoryProducts$.asObservable().delay(1000);
  }

  addProduct(product: Product): Observable<Product> {
    return this.addProductInternal(product)
      .map((res: any) => res.data)
      .catch(() => Observable.throw('Ошибка при добавлении товара'))
      .finally(() => this.loadCategoryProducts(product.category.id));
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

  private loadCategoryProducts(categoryId: string) {
    Observable.of(ProductsServce.fakeProducts
      .filter(prod => prod.category.id === categoryId))
      .subscribe(data => this.categoryProducts$.next(data));
  }

  private getFakeProducts(): Product[] {

    const socksCategory = new Category({
      id: '400F9E05-FD3F-449E-B252-5D59265ADD69',
      name: 'Носки'
    });

    const packageCategory = new Category({
      id: '123F9E05-FD3F-449E-B252-5D59265ADD00',
      name: 'Упаковка'
    });

    return [
      new Product({
        id: '3A560849-A3AB-41BA-B236-B86C86EC7B75',
        name: 'Банка',
        code: 'BNK01',
        createdOn: '2018-04-10',
        deliveriesNumber: 1,
        lastDeliveryDate: '2018-03-11',
        lastDeliveryCount: 300,
        totalCount: 300,
        sizes: [
          new SizeItem('Single', 300)
        ],
        category: packageCategory
      }),
      new Product({
        id: '87A904E3-B90A-47A3-A928-7680379EEB19',
        name: 'Упаковка язык',
        code: 'PKG03',
        createdOn: '2018-04-10',
        deliveriesNumber: 1,
        lastDeliveryDate: '2018-03-01',
        lastDeliveryCount: 250,
        totalCount: 250,
        sizes: [
          new SizeItem('Triple', 250)
        ],
        category: packageCategory
      }),
      new Product({
        id: '583CE713-ABF9-4593-A5A3-7DBF417FA2B1',
        name: 'Упаковка большая',
        code: 'PKG09',
        createdOn: '2018-04-10',
        deliveriesNumber: 1,
        lastDeliveryDate: '2018-01-27',
        lastDeliveryCount: 210,
        totalCount: 210,
        sizes: [
          new SizeItem('Big', 210)
        ],
        category: packageCategory
      }),
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
        ],
        category: socksCategory
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
        ],
        category: socksCategory
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
        ],
        category: socksCategory
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
        ],
        category: socksCategory
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
        ],
        category: socksCategory
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
        ],
        category: socksCategory
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
        ],
        category: socksCategory
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
        ],
        category: socksCategory
      })
    ];
  }
}
