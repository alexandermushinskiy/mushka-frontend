import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import * as moment from 'moment';

import { Supplier } from '../../shared/models/supplier.model';
import { DeliveryType } from '../shared/enums/delivery-type.enum';
import { PaymentMethod } from '../shared/enums/payment-method.enum';
import { availableColumns } from '../../shared/constants/available-columns.const';

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

  constructor(private formBuilder: FormBuilder,
              private location: Location) { }

  ngOnInit() {
    this.cost = 110.82;
    this.transferFee = 223.50;

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

  changeDeliveryType(deliveryType: DeliveryType) {
    this.selectedDeliveryType = deliveryType;
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
