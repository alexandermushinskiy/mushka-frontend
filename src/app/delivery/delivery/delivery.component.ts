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

@Component({
  selector: 'psa-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  newDeliveryForm: FormGroup;
  deliveryDate: string;
  batchNumber: string;
  cost: number;
  transferFee: number;
  datePickerOptions: any;
  deliveryTypesList = Object.values(DeliveryType);
  PaymentMethodsList = Object.values(PaymentMethod);
  dateFormat = 'YYYY-MM-DD';
  deliveryType = DeliveryType;
  selectedDeliveryType: DeliveryType = DeliveryType.PRODUCTS;
  deliveryProducts: ProductItem[] = [];
  deliveryServices: ServiceItem[] = [];

  constructor(private formBuilder: FormBuilder,
              private location: Location) { }

  ngOnInit() {
    this.cost = 110.82;
    this.transferFee = 223.50;

    setTimeout(() => {
      this.deliveryProducts = [
        new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
        new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' }),
        new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 })
      ]

      this.deliveryServices = [
        new ServiceItem({ name: 'Фотосессия товара', cost: 270.00 }),
        new ServiceItem({ name: 'Разработка вебсайта', cost: 7000.00 })
      ]
    }, 200);
    

    this.buildForm();
  }

  goBack() {
    this.location.back();
  }

  onDateChanged(date) {
    this.deliveryDate = moment(date).format(this.dateFormat);
  }

  onSelectedSupplier(supplier: Supplier) {

  }

  onDeliveryTypeSelected(deliveryType: DeliveryType) {

  }

  onPaymentMethodSelected(paymentMethod: PaymentMethod) {

  }
  
  onProductItemAdded(productItem: ProductItem) {
    this.deliveryProducts = [...this.deliveryProducts, productItem];
  }

  onServiceItemAdded(serviceItem: ServiceItem) {
    this.deliveryServices = [...this.deliveryServices, serviceItem];
  }

  changeDeliveryType(deliveryType: DeliveryType) {
    setTimeout(() => {
      this.selectedDeliveryType = deliveryType;
    }, 200);
  }

  private buildForm() {
    this.newDeliveryForm = this.formBuilder.group({
      requestDate: [],
      deliveryDate: [this.deliveryDate, Validators.required],
      batchNumber: [this.batchNumber],
      cost: [this.cost],
      transferFee: [this.transferFee],
      totalCost: []
    });
  }

}
