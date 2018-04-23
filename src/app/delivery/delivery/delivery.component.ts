import { Component, OnInit, ViewChild } from '@angular/core';
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
import { SuppliersDropdownComponent } from '../shared/widgets/suppliers-dropdown/suppliers-dropdown.component';
import { DeliveryProductsListComponent } from '../delivery-products-list/delivery-products-list.component';
import { DeliveryServicesListComponent } from '../delivery-services-list/delivery-services-list.component';

@Component({
  selector: 'psa-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  @ViewChild('suppliersList') suppliersList: SuppliersDropdownComponent;
  @ViewChild('productsList') productsList: DeliveryProductsListComponent;
  @ViewChild('servicesList') servicesList: DeliveryServicesListComponent;

  deliveryForm: FormGroup;
  deliverId: string;
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
    const ctrl = this.deliveryForm.controls['previousOrdersAmount'];
    ctrl.setValue(supplier.address.length);
  }

  changeDeliveryType(deliveryType: DeliveryType) {
    this.selectedDeliveryType = deliveryType;
  }

  saveAsDraft() {
    this.isDraftSaving = true;
    this.saveDelivery(true);
  }

  save() {
    this.isSaving = true;
    this.saveDelivery(false);
  }

  addDeliveryItem(deliveryType: DeliveryType, deliveryItem: ProductItem | ServiceItem) {
    const deliveryItems = this.deliveryItems[deliveryType].data;
    this.deliveryItems[deliveryType].data = [...deliveryItems, deliveryItem];

    const productsCtrl = this.getDeliveryItemsControl(deliveryType);
    productsCtrl.push(this.formBuilder.group(deliveryItem));
  }

  removeDeliveryItem(deliveryType: DeliveryType, rowIndex: number) {
    const deliveryItems = this.deliveryItems[deliveryType].data;
    deliveryItems.splice(rowIndex, 1);
    this.deliveryItems[deliveryType].data = [...deliveryItems];

    const productsCtrl = this.getDeliveryItemsControl(deliveryType);
    productsCtrl.removeAt(rowIndex);
  }

  edit(delivery: Delivery) {
    this.deliverId = delivery.id;
    this.deliveryForm.patchValue(delivery);

    this.deliveryItems[DeliveryType.PRODUCTS].data = delivery.products;
    this.deliveryItems[DeliveryType.SERVICES].data = delivery.services;
  }

  private getDeliveryItemsControl(deliveryType: DeliveryType): FormArray {
    const controlName: 'products' | 'services' = deliveryType === DeliveryType.PRODUCTS ? 'products' : 'services';
    return <FormArray>this.deliveryForm.get(controlName);
  }

  private saveDelivery(isDraft: boolean) {
    const delivery = this.createDelivery(isDraft);
console.info('delivery', delivery);
    (this.deliverId ? this.deliveryService.update(delivery) : this.deliveryService.create(delivery))
      .subscribe(
        (res: Delivery) => this.onSavedSucces(res, delivery.id ? 'updated' : 'created'),
        () => this.onSavedError());
  }

  private onSavedSucces(delivery: Delivery, action: string) {
    this.stopLoadingIndicators();

    this.deliveryForm.reset();
    this.deliveryItems[DeliveryType.PRODUCTS].data = [];
    this.deliveryItems[DeliveryType.SERVICES].data = [];
    
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

  private createDelivery(isDraft: boolean = true): Delivery {
    const deliveryFormValue = this.deliveryForm.value;

    return new Delivery({
      id: this.deliverId,
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

  private createProducts(): ProductItem[] {
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

  private createServices(): ServiceItem[] {
    return this.deliveryForm.value.services.map((prop: any) => {
      return new ServiceItem({
        name: prop.name,
        cost: prop.cost,
        notes: prop.notes
      });
    });
  }

  // private setFakeData() {
  //   const deliveryProducts = [
  //     new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
  //     new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' }),
  //     new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 }),
  //     new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
  //     new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' }),
  //     // new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 }),
  //     // new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
  //     // new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' }),
  //     // new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 }),
  //     // new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
  //     // new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' }),
  //     // new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 }),
  //     // new ProductItem({ product: new Product({name: 'Galaxy (GLX01)'}), amount: 100, costPerItem: 27.00, notes: 'Два носка брака' }),
  //     // new ProductItem({ product: new Product({name: 'Potato (PTT01)'}), amount: 320, costPerItem: 7.50, notes: 'Неправильно пришиты бирки и что-то там еще есть' }),
  //     // new ProductItem({ product: new Product({name: 'Football (FTB01)'}), amount: 25, costPerItem: 1234.55 })
  //   ];
  //   this.deliveryItems[DeliveryType.PRODUCTS].data = deliveryProducts;

  //   const deliveryServices = [
  //     new ServiceItem({ name: 'Фотосессия товара', cost: 270.00, notes: 'какие-то там заметки' }),
  //     new ServiceItem({ name: 'Разработка вебсайта', cost: 7000.00 })
  //   ];
  //   this.deliveryItems[DeliveryType.SERVICES].data = deliveryServices;
  // }
}
