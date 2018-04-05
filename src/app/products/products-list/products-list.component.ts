import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { ProductsServce } from '../../core/api/products.service';
import { ProductTablePreview } from '../shared/models/product-table-preview';
import { availableColumns } from '../../shared/constants/available-columns.const';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { PsaDatatableComponent } from '../psa-datatable/psa-datatable.component';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'psa-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @ViewChild(PsaDatatableComponent) datatable: PsaDatatableComponent;
  
  rows: ProductTablePreview[];
  loadingIndicator = true;
  isModalLoading = false;
  total = 0;
  shown = 0;
  availableCols = availableColumns.products;
  selectedProduct: Product = null;

  private modalRef: NgbModalRef;
  private readonly modalConfig: NgbModalOptions = {
    windowClass: 'products-modal',
    backdrop: 'static',
    size: 'sm'
  };
  
  constructor(private modalService: NgbModal,
              private productsService: ProductsServce,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.loadingIndicator = true;

    this.productsService.getProducts()
      .subscribe(
        res => this.onSuccess(res),
        () => this.onError()
      );
  }

  onRowsUpdated(rowsAmount: number) {
    this.shown = rowsAmount;
  }

  addProduct(content: ElementRef) {
    this.modalRef = this.modalService.open(content, this.modalConfig);
  }

  saveProduct(product: Product) {
    this.productsService.addProduct(product)
      .subscribe(
        (res: Product) => this.onSaveSuccess(res, product.id ? 'updated' : 'created'),
        () => this.onSaveError()
      );
  }

  closeModal() {
    this.modalRef.close();
  }

  private onSuccess(products) {
    this.rows = products.map((el, index) => new ProductTablePreview(el, index));
    this.total = products.length;
    this.loadingIndicator = false;
  }

  private onError() {
    this.loadingIndicator = false;
    this.notificationsService.danger('Error', 'Unable to load products');
  }
  
  private onSaveSuccess(product: Product, action: string) {
    this.isModalLoading = false;
    this.closeModal();
    this.notificationsService.success('Success', `Product has been successfully ${action}`);
  }

  private onSaveError() {
    this.notificationsService.danger('Error', 'Unable to save Product data');
    this.isModalLoading = false;
  }

}
