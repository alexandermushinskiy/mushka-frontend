import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NG_VALIDATORS, FormArray } from '@angular/forms';
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
import { DeliveryOption } from '../shared/enums/delivery-option.enum';
import { DeliveryItemsValidator } from '../shared/validators/delivery-items.validator';
import { NotificationsService } from '../../core/notifications/notifications.service';

@Component({
  selector: 'psa-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  deliveryForm: FormGroup;
  requestDate: string;
  deliveryDate: string;
  supplier: Supplier;
  previousOrdersAmount: number;
  batchNumber: string = '1234567890';
  paymentMethod: string;
  deliveryCost: number;
  transferFee: number;
  totalCost: number;

  datePickerOptions: any;
  deliveryTypesList = [DeliveryType.PRODUCTS, DeliveryType.SERVICES, DeliveryType.EQUIPMENT];
  PaymentMethodsList = Object.values(PaymentMethod);
  dateFormat = 'YYYY-MM-DD';
  deliveryType = DeliveryType;
  selectedDeliveryType: DeliveryType = DeliveryType.PRODUCTS;

  deliveryItems: { [type: number]: DeliveryItem } = {};
  historicalDeliveries: Delivery[];
  draftDeliveries: Delivery[];
  optionsList = [DeliveryOption.DRAFTS, DeliveryOption.HISTORY];
  selectedOption = DeliveryOption.DRAFTS;
  deliveryOption = DeliveryOption;
  isSaving = false;
  isDraftSaving = false;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private deliveryService: DeliveriesService,
              private notificationsService: NotificationsService) {
  }

  get isDraftValid(): boolean {
    return this.deliveryForm.value.requestDate && this.deliveryForm.value.supplier;
  }

  ngOnInit() {

    this.deliveryTypesList
      .map(type => this.deliveryItems[type] = new DeliveryItem(type, deliveryTypeNames[type], []));

    //this.setFakeData();

    this.deliveryService.getDeliveries()
      .subscribe((deliveries: Delivery[]) => {
        this.historicalDeliveries = deliveries.filter((del: Delivery) => !del.isDraft);
        this.draftDeliveries = deliveries.filter((del: Delivery) => del.isDraft);
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
    const supplierCtrl = this.deliveryForm.controls['supplier'];
    supplierCtrl.setValue(supplier);

    const ctrl = this.deliveryForm.controls['previousOrdersAmount'];
    ctrl.setValue(supplier.address.length);
  }

  onPaymentMethodSelected(paymentMethod: PaymentMethod) {
    const ctrl = this.deliveryForm.controls['paymentMethod'];
    ctrl.setValue(paymentMethod);
  }

  changeDeliveryType(deliveryType: DeliveryType) {
    this.selectedDeliveryType = deliveryType;
  }

  saveAsDraft() {
    this.isDraftSaving = true;
    const delivery = this.createDelivery();
    this.deliveryService.addDelivery(delivery)
      .subscribe(
        (res: Delivery) => this.onSavedSucces(res, delivery.id ? 'updated' : 'created'),
        () => this.onSavedError());
  }

  save() {
    this.isSaving = true;
    const delivery = this.createDelivery(false);
    this.deliveryService.addDelivery(delivery)
      .subscribe(
        (res: Delivery) => this.onSavedSucces(res, delivery.id ? 'updated' : 'created'),
        () => this.onSavedError());
  }

  private onSavedSucces(delivery: Delivery, action: string) {
    this.stopLoadingIndicators();
    this.deliveryForm.reset();
    this.notificationsService.success('Success', `Delivery has been successfully ${action}`);
  }

  private onSavedError() {
    this.stopLoadingIndicators();
    this.notificationsService.danger('Error', 'Unable to save delivery data');
  }

  private stopLoadingIndicators() {
    this.isDraftSaving = false;
    this.isSaving = false;
  }

  private buildForm() {
    this.deliveryForm = this.formBuilder.group({
      batchNumber: [this.batchNumber],
      requestDate: [this.requestDate, Validators.required],
      deliveryDate: [this.deliveryDate, Validators.required],
      supplier: [this.supplier, Validators.required],
      previousOrdersAmount: [this.previousOrdersAmount],
      paymentMethod: [this.paymentMethod, Validators.required],
      deliveryCost: [this.deliveryCost, Validators.required],
      transferFee: [this.transferFee, Validators.required],
      totalCost: [this.totalCost, Validators.required],
      products: this.formBuilder.array(
        this.deliveryItems[DeliveryType.PRODUCTS].data.map(param => param)),
      services: this.formBuilder.array(
        this.deliveryItems[DeliveryType.SERVICES].data.map(param => param))
    }, {validator: DeliveryItemsValidator.required});
  }

  private getFormattedDate(date: string): string {
    return moment(date).format(this.dateFormat);
  }

  private addDeliveryItem(deliveryType: DeliveryType, deliveryItem: ProductItem | ServiceItem) {
    const deliveryItems = this.deliveryItems[deliveryType].data;
    this.deliveryItems[deliveryType].data = [...deliveryItems, deliveryItem];

    const controlName: 'products' | 'services' = deliveryType === DeliveryType.PRODUCTS ? 'products' : 'services';
    const productsCtrl = <FormArray>this.deliveryForm.get(controlName);
    productsCtrl.push(this.formBuilder.group(deliveryItem));
  }

  private removeDeliveryItem(deliveryType: DeliveryType, rowIndex: number) {
    const deliveryItems = this.deliveryItems[deliveryType].data;
    deliveryItems.splice(rowIndex, 1);
    this.deliveryItems[deliveryType].data = [...deliveryItems];

    const controlName: 'products' | 'services' = deliveryType === DeliveryType.PRODUCTS ? 'products' : 'services';
    const productsCtrl = <FormArray>this.deliveryForm.get(controlName);
    productsCtrl.removeAt(rowIndex);
  }

  createDelivery(isDraft: boolean = true): Delivery {
    const deliveryFormValue = this.deliveryForm.value;

    return new Delivery({
      batchNumber: deliveryFormValue.batchNumber,
      requestDate: deliveryFormValue.requestDate || null,
      deliveryDate: deliveryFormValue.deliveryDate || null,
      supplier: deliveryFormValue.supplier || null,
      paymentMethod: deliveryFormValue.paymentMethod,
      transferFee: deliveryFormValue.transferFee,
      deliveryCost: deliveryFormValue.deliveryCost,
      totalCost: deliveryFormValue.totalCost,
      products: this.createProducts(),
      services: this.createServices(),
      isDraft: isDraft
    });
  }

  createProducts(): ProductItem[] {
    return this.deliveryForm.value.products.map((prop: any) => {
      return new ProductItem({
        product: prop.product,
        amount: prop.amount,
        costPerItem: prop.costPerItem,
        totalCost: prop.totalCost,
        notes: prop.notes
      });
    });
  }

  createServices(): ServiceItem[] {
    return this.deliveryForm.value.services.map((prop: any) => {
      return new ServiceItem({
        name: prop.name,
        cost: prop.cost,
        notes: prop.notes
      });
    });
  }

  private setFakeData() {
    const deliveryProducts = [
      new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
      new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' }),
      new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 }),
      new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
      new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' }),
      // new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 }),
      // new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
      // new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' }),
      // new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 }),
      // new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
      // new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' }),
      // new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 }),
      // new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
      // new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' }),
      // new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 })
    ];
    this.deliveryItems[DeliveryType.PRODUCTS].data = deliveryProducts;

    const deliveryServices = [
      new ServiceItem({ name: 'Фотосессия товара', cost: 270.00, notes: 'какие-то там заметки' }),
      new ServiceItem({ name: 'Разработка вебсайта', cost: 7000.00 })
    ];
    this.deliveryItems[DeliveryType.SERVICES].data = deliveryServices;
  }
}
