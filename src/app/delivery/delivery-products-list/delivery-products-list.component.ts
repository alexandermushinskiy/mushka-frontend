import { Component, OnInit, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { DeliveryItemTablePreview } from '../shared/models/delivery-item-table-preview';
import { availableColumns } from '../../shared/constants/available-columns.const';
import { DeliveryProductItem } from '../shared/models/delivery-product-item';

@Component({
  selector: 'psa-delivery-products-list',
  templateUrl: './delivery-products-list.component.html',
  styleUrls: ['./delivery-products-list.component.scss']
})
export class DeliveryProductsListComponent implements OnInit {
  availableColumns = availableColumns.deliveryProducts;
  deliveryItemRows: DeliveryItemTablePreview[] = [];
  total = 0;
  shown = 0;
  isModalLoading: false;

  private modalRef: NgbModalRef;
  private readonly modalConfig: NgbModalOptions = {
    windowClass: 'delivery-items-modal',
    backdrop: 'static',
    size: 'sm'
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

    const deliveryItems = [
      new DeliveryProductItem({ name: 'Имя товара 1', amount: 100, costPerItem: 27.00 }),
      new DeliveryProductItem({ name: 'Имя товара 2', amount: 320, costPerItem: 7.50 }),
      new DeliveryProductItem({ name: 'Имя товара 3', amount: 500, costPerItem: 11.30 }),
      // new DeliveryItem({ name: 'Имя товара/услуги 1', amount: 100, costPerItem: 27.00 }),
      // new DeliveryItem({ name: 'Имя товара/услуги 2', amount: 320, costPerItem: 7.50 }),
      // new DeliveryItem({ name: 'Имя товара/услуги 3', amount: 500, costPerItem: 11.30 }),
      // new DeliveryItem({ name: 'Имя товара/услуги 1', amount: 100, costPerItem: 27.00 }),
      // new DeliveryItem({ name: 'Имя товара/услуги 2', amount: 320, costPerItem: 7.50 }),
      // new DeliveryItem({ name: 'Имя товара/услуги 3', amount: 500, costPerItem: 11.30 }),
      // new DeliveryItem({ name: 'Имя товара/услуги 1', amount: 100, costPerItem: 27.00 }),
      // new DeliveryItem({ name: 'Имя товара/услуги 2', amount: 320, costPerItem: 7.50 }),
      // new DeliveryItem({ name: 'Имя товара/услуги 3', amount: 500, costPerItem: 11.30 }),
      // new DeliveryItem({ name: 'Имя товара/услуги 1', amount: 100, costPerItem: 27.00 }),
      // new DeliveryItem({ name: 'Имя товара/услуги 2', amount: 320, costPerItem: 7.50 }),
      // new DeliveryItem({ name: 'Имя товара/услуги 3', amount: 500, costPerItem: 11.30 }),
    ]

    setTimeout(() => {
      this.deliveryItemRows = deliveryItems.map((el, index) => new DeliveryItemTablePreview(el, index));
      this.total = deliveryItems.length;
    }, 0);

  }

  onRowsUpdated(rowsAmount: number) {
    this.shown = rowsAmount;
  }

  addDeliveryItem(content: ElementRef) {
    this.modalRef = this.modalService.open(content, this.modalConfig);
  }
  
  closeModal() {
    this.modalRef.close();
  }

  saveDeliveryItem(deliveryItem: DeliveryProductItem) {
    console.info(deliveryItem);
  }
}
