import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { Supplier } from '../../shared/models/supplier.model';

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

  dateFormat = 'YYYY-MM-DD';

  constructor(private formBuilder: FormBuilder,
              private location: Location) { }

  ngOnInit() {

    this.deliveryDate = moment().format(this.dateFormat);
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

  private buildForm() {
    this.newDeliveryForm = this.formBuilder.group({
      deliveryDate: [this.deliveryDate, Validators.required],
      batchNumber: [this.batchNumber],
      cost: [this.cost],
      transferFee: [this.transferFee]
    });
  }

}
