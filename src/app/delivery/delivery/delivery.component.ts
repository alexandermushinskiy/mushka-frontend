import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import * as moment from 'moment';

import { Supplier } from '../../shared/models/supplier.model';
import { DeliveryType } from '../shared/enums/delivery-type.enum';
import { PaymentMethod } from '../shared/enums/payment-method.enum';
import { availableColumns } from '../../shared/constants/available-columns.const';
import { ProductItem } from '../shared/models/product-item.model';
import { ServiceItem } from '../shared/models/service-item.model';
import { Product } from '../../shared/models/product.model';
import { DeliveriesService } from '../../core/api/deliveries.service';
import { Delivery } from '../shared/models/delivery.model';
import { KeyValuePair } from '../../shared/models/key-value-pair.model';
import { deliveryTypeNames } from '../shared/constants/delivery-type-names.const';
import { DeliveryItem } from '../shared/models/delivery-item.model';

@Component({
  selector: 'psa-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  deliveryForm: FormGroup;
  requestDate: string;
  deliveryDate: string;
  previousOrdersNumber = '';
  batchNumber: string;
  cost: number;
  transferFee: number;
  datePickerOptions: any;
  deliveryTypesList = [DeliveryType.PRODUCTS, DeliveryType.SERVICES, DeliveryType.EQUIPMENT]; //Object.values(DeliveryType);
  PaymentMethodsList = Object.values(PaymentMethod);
  dateFormat = 'YYYY-MM-DD';
  deliveryType = DeliveryType;
  selectedDeliveryType: DeliveryType = DeliveryType.PRODUCTS;
  deliveryProducts: ProductItem[] = [];
  deliveryServices: ServiceItem[] = [];

  deliveryItems: { [type: number]: DeliveryItem } = {};

  deliveries: Delivery[];

  optionsList = ['История', 'Черновики'];
  selectedOption = 'История';

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private deliveryService: DeliveriesService) {
  }

  ngOnInit() {

    this.deliveryTypesList
      .map(type => this.deliveryItems[type] = new DeliveryItem(type, deliveryTypeNames[type], [])); //{ displayName: deliveryTypeNames[type], amount: 0});

    setTimeout(() => {
      this.deliveryProducts = [
        new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
        new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' }),
        new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 })
      ];
      this.deliveryItems[DeliveryType.PRODUCTS].data = this.deliveryProducts;

      this.deliveryServices = [
        new ServiceItem({ name: 'Фотосессия товара', cost: 270.00 }),
        new ServiceItem({ name: 'Разработка вебсайта', cost: 7000.00 })
      ];
      this.deliveryItems[DeliveryType.SERVICES].data = this.deliveryServices;
    }, 200);

    this.deliveryService.getDeliveries()
      .subscribe(res => {
        this.deliveries = res;
      })

    this.buildForm();
  }

  goBack() {
    this.location.back();
  }

  onReuestDateChanged(date) {
    this.requestDate = this.getFormattedDate(date);
  }

  onDeliveryDateChanged(date) {
    this.deliveryDate = this.getFormattedDate(date);
  }

  onSupplierSelected(supplier: Supplier) {
    const ctrl = this.deliveryForm.controls['previousOrdersNumber'];
    ctrl.setValue(supplier.address.length);
  }

  onDeliveryTypeSelected(deliveryType: DeliveryType) {

  }

  onPaymentMethodSelected(paymentMethod: PaymentMethod) {

  }
  
  onProductItemAdded(productItem: ProductItem) {
    this.deliveryProducts = [...this.deliveryProducts, productItem];
    this.deliveryItems[DeliveryType.PRODUCTS].data = this.deliveryProducts;
  }

  onServiceItemAdded(serviceItem: ServiceItem) {
    this.deliveryServices = [...this.deliveryServices, serviceItem];
    this.deliveryItems[DeliveryType.SERVICES].data = this.deliveryServices;
  }

  changeDeliveryType(deliveryType: DeliveryType) {
    setTimeout(() => {
      this.selectedDeliveryType = deliveryType;
    }, 200);
  }

  private buildForm() {
    this.deliveryForm = this.formBuilder.group({
      requestDate: [this.requestDate, Validators.required],
      deliveryDate: [this.deliveryDate, Validators.required],
      previousOrdersNumber: [this.previousOrdersNumber],
      batchNumber: [this.batchNumber],
      cost: [this.cost],
      transferFee: [this.transferFee],
      totalCost: []
    });
  }

  private getFormattedDate(date: string): string {
    return moment(date).format(this.dateFormat);
  }

}
