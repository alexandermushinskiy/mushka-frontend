import { Component, OnInit, ViewChild } from '@angular/core';

import { ProductsServce } from '../../core/api/products.service';
import { ProductTablePreview } from '../shared/models/product-table-preview';
import { availableColumns } from '../shared/constants/available-columns.const';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { PsaDatatableComponent } from '../psa-datatable/psa-datatable.component';

@Component({
  selector: 'psa-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @ViewChild(PsaDatatableComponent) datatable: PsaDatatableComponent;
  
  rows: ProductTablePreview[];
  loadingIndicator = true;
  total = 0;
  shown = 0;
  availableCols = availableColumns.products;

  constructor(private productsService: ProductsServce,
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

  private onSuccess(products) {
    this.rows = products.map((el, index) => new ProductTablePreview(el, index));
    this.total = products.length;
    this.loadingIndicator = false;
  }

  private onError() {
    this.loadingIndicator = false;
    this.notificationsService.danger('Error', 'Unable to load products');
  }
}
