import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Delivery } from "../../delivery/shared/models/delivery.model";
import { Supplier } from "../../shared/models/supplier.model";
import { ProductItem } from "../../delivery/shared/models/product-item.model";
import { ServiceItem } from "../../delivery/shared/models/service-item.model";
import { PaymentMethod } from "../../delivery/shared/enums/payment-method.enum";
import { GuidGenerator } from "../guid-generator/guid.generator";

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
        requestDate: 'Янв 13, 2018',
        deliveryDate:  'Янв 17, 2018',
        supplier: new Supplier({
          name: 'Какой-то там поставщик',
          address: 'ул.Абрикосовая 27/Б, г.Киев, УКРАИНА'
        }),
        paymentMethod:  PaymentMethod.CREDIT_CARD,
        batchNumber:  'D00001',
        transferFee: 10.00,
        deiveryCost: 70.00,
        totalCost: 1200.00,
        products: [],
        services: [],
        isDraft: false
      }),
      new Delivery({
        requestDate: 'Янв 21, 2018',
        deliveryDate:  'Янв 22, 2018',
        supplier: new Supplier({
          name: 'Таки да, поставщик',
          address: 'ул.Янтарная 3, г.Львов, УКРАИНА'
        }),
        paymentMethod:  PaymentMethod.TRANSFER_TO_CARD,
        batchNumber:  'D00331',
        transferFee: 10.00,
        deiveryCost: 70.00,
        totalCost: 1200.00,
        products: [],
        services: [],
        isDraft: false
      }),
      new Delivery({
        requestDate: 'Фев 05, 2018',
        deliveryDate:  'Фев 11, 2018',
        supplier: new Supplier({
          name: 'Да-да, там был поставщик',
          address: 'ул.Лазурная 55, г.Одесса, УКРАИНА'
        }),
        paymentMethod:  PaymentMethod.CASH,
        batchNumber:  'D00515',
        transferFee: 10.00,
        deiveryCost: 70.00,
        totalCost: 1200.00,
        products: [],
        services: [],
        isDraft: false
      }),
      new Delivery({

        requestDate: 'Март 15, 2018',
        deliveryDate:  'Фев 16, 2018',
        supplier: new Supplier({
          name: 'Не успел дописать',
          address: 'Где-то на окраине села'
        }),
        paymentMethod:  PaymentMethod.CREDIT_CARD,
        batchNumber:  'D00775',
        transferFee: 10.00,
        deiveryCost: 70.00,
        totalCost: 1200.00,
        products: [],
        services: [],
        isDraft: true
      })
    ];
  }
}
