import { Component, OnInit, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { ProductTablePreview } from '../shared/models/product-table-preview.model';
import { availableColumns } from '../../shared/constants/available-columns.const';
import { ProductItem } from '../shared/models/product-item.model';

@Component({
  selector: 'psa-delivery-products-list',
  templateUrl: './delivery-products-list.component.html',
  styleUrls: ['./delivery-products-list.component.scss']
})
export class DeliveryProductsListComponent implements OnInit {
  availableColumns = availableColumns.deliveryProducts;
  deliveryItemRows: ProductTablePreview[] = [];
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

    const deliveryProducts = [
      new ProductItem({ name: 'Имя товара 1', amount: 100, costPerItem: 27.00 }),
      new ProductItem({ name: 'Имя товара 2', amount: 320, costPerItem: 7.50 }),
      new ProductItem({ name: 'Имя товара 3', amount: 500, costPerItem: 11.30 }),
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
      this.deliveryItemRows = deliveryProducts.map((el, index) => new ProductTablePreview(el, index));
      this.total = deliveryProducts.length;
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

  saveDeliveryItem(deliveryItem: ProductItem) {
    console.info(deliveryItem);
  }
}
