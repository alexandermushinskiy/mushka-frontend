import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Delivery } from "../../delivery/shared/models/delivery.model";
import { Supplier } from "../../shared/models/supplier.model";
import { ProductItem } from "../../delivery/shared/models/product-item.model";
import { ServiceItem } from "../../delivery/shared/models/service-item.model";
import { PaymentMethod } from "../../delivery/shared/enums/payment-method.enum";
import { GuidGenerator } from "../guid-generator/guid.generator";
import { Product } from "../../shared/models/product.model";

@Injectable()
export class DeliveriesService {
  private static fakeDeliveries: Delivery[];
  private deliveries$: BehaviorSubject<Delivery[]> = new BehaviorSubject([]);
  
  constructor() {
    DeliveriesService.fakeDeliveries = this.getFakeDeliveries();

    this.loadDeliveries();
  }
  
  getDeliveries(): Observable<Delivery[]> {
    return this.deliveries$.asObservable().delay(500);
  }

  create(delivery: Delivery): Observable<Delivery> {
    return this.addDeliveryInternal(delivery)
      .map((res: any) => res.data)
      .catch(() => Observable.throw('Ошибка при добавлении поступления'))
      .finally(() => this.loadDeliveries())
      .delay(500);
  }

  update(delivery: Delivery): Observable<Delivery> {
    return this.updateDeliveryInternal(delivery)
      .map((res: any) => res.data)
      .catch(() => Observable.throw('Ошибка при редактировании поступления'))
      .finally(() => this.loadDeliveries())
      .delay(500);
  }

  private loadDeliveries() {
    Observable.of(DeliveriesService.fakeDeliveries)
      .subscribe(data => this.deliveries$.next(data));
  }

  private addDeliveryInternal(delivery: Delivery): Observable<any> {
    const addedDelivery = new Delivery(Object.assign({}, delivery, {
      id: GuidGenerator.newGuid() //'11111111-AAAA-BBBB-A478-5185A07C39BF'
    }));

    DeliveriesService.fakeDeliveries.push(addedDelivery);
    return Observable.of({data: addedDelivery});
  }

  private updateDeliveryInternal(delivery: Delivery): Observable<any> {
    let storedDelivery = DeliveriesService.fakeDeliveries.find(del => del.id === delivery.id);
    storedDelivery = Object.assign(storedDelivery, delivery);

    return Observable.of({data: storedDelivery});
  }

  private getFakeDeliveries(): Delivery[] {
    return [
      new Delivery({
        id: '2A689E03-8D4A-4397-9292-2ECBD1DAEEB3',
        requestDate: 'Янв 13, 2018',
        deliveryDate:  'Янв 17, 2018',
        supplier: new Supplier({
          id: 'FE557110-FE4E-492E-933E-EACD6A31E22D',
          name: 'Вова-Зи-Львов',
          address: 'ул. Шевченка 41, г.Львов, УКРАИНА',
          phone: '+380(50)921-7654',
          email: 'hello@vova-zi-lvova.com',
          contactPerson: 'Сахаров Владимир Сергеевич',
          paymentConditions: 'Безналичный',
          services: 'Бирки',
          webSite: 'vova-zi-lvova.com.ua'
        }),
        paymentMethod:  PaymentMethod.CREDIT_CARD,
        batchNumber:  'D00001',
        transferFee: 10.00,
        deliveryCost: 70.00,
        totalCost: 1200.00,
        products: [
          new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
          new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' })
        ],
        services: [],
        isDraft: false
      }),
      new Delivery({
        id: '3D62C4A9-6A0A-473C-B82D-FF3BDC0E14D5',
        requestDate: 'Янв 21, 2018',
        deliveryDate:  'Янв 22, 2018',
        supplier: new Supplier({
          id: 'FE557110-FE4E-492E-933E-EACD6A31E22D',
          name: 'Вова-Зи-Львов',
          address: 'ул. Шевченка 41, г.Львов, УКРАИНА',
          phone: '+380(50)921-7654',
          email: 'hello@vova-zi-lvova.com',
          contactPerson: 'Сахаров Владимир Сергеевич',
          paymentConditions: 'Безналичный',
          services: 'Бирки',
          webSite: 'vova-zi-lvova.com.ua'
        }),
        paymentMethod:  PaymentMethod.TRANSFER_TO_CARD,
        batchNumber:  'D00331',
        transferFee: 10.00,
        deliveryCost: 70.00,
        totalCost: 1200.00,
        products: [
          new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 })
        ],
        services: [],
        isDraft: false
      }),
      new Delivery({
        id: '4225E8B0-D56E-488B-B2AB-9B511D0AF22F',
        requestDate: 'Фев 05, 2018',
        deliveryDate:  'Фев 11, 2018',
        supplier: new Supplier({
          id: 'FE557110-FE4E-492E-933E-EACD6A31E22D',
          name: 'Вова-Зи-Львов',
          address: 'ул. Шевченка 41, г.Львов, УКРАИНА',
          phone: '+380(50)921-7654',
          email: 'hello@vova-zi-lvova.com',
          contactPerson: 'Сахаров Владимир Сергеевич',
          paymentConditions: 'Безналичный',
          services: 'Бирки',
          webSite: 'vova-zi-lvova.com.ua'
        }),
        paymentMethod:  PaymentMethod.CASH,
        batchNumber:  'D00515',
        transferFee: 10.00,
        deliveryCost: 70.00,
        totalCost: 1200.00,
        products: [
          new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' })
        ],
        services: [],
        isDraft: false
      }),
      new Delivery({
        id: 'C1FECCED-9182-4B41-BF49-FA9B7FFABD79',
        requestDate: 'Март 15, 2018',
        deliveryDate:  'Фев 16, 2018',
        supplier: new Supplier({
          id: 'FE557110-FE4E-492E-933E-EACD6A31E22D',
          name: 'Вова-Зи-Львов',
          address: 'ул. Шевченка 41, г.Львов, УКРАИНА',
          phone: '+380(50)921-7654',
          email: 'hello@vova-zi-lvova.com',
          contactPerson: 'Сахаров Владимир Сергеевич',
          paymentConditions: 'Безналичный',
          services: 'Бирки',
          webSite: 'vova-zi-lvova.com.ua'
        }),
        paymentMethod:  PaymentMethod.CREDIT_CARD,
        batchNumber:  'D00775',
        transferFee: 10.00,
        deliveryCost: 70.00,
        totalCost: 1200.00,
        products: [
          new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' })
        ],
        services: [],
        isDraft: true
      })
    ];
  }
}
