import { Component, OnInit, ViewChild } from '@angular/core';

import { SupplierTablePreview } from '../shared/models/supplier-table-preview';
import { SuppliersTableComponent } from '../suppliers-table/suppliers-table.component';
import { availableColumns } from '../../shared/constants/available-columns.const';
import { SuppliersService } from '../../core/api/suppliers.service';
import { NotificationsService } from '../../core/notifications/notifications.service';

@Component({
  selector: 'psa-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss']
})
export class SuppliersListComponent implements OnInit {
  @ViewChild(SuppliersTableComponent) datatable: SuppliersTableComponent;
  
  rows: SupplierTablePreview[];
  loadingIndicator = true;
  total = 0;
  shown = 0;
  availableCols = availableColumns.suppliers;

  constructor(private suppliersService: SuppliersService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.loadingIndicator = true;

    this.suppliersService.getSuppliers()
      .subscribe(
        res => this.onSuccess(res),
        () => this.onError()
      );
  }

  onRowsUpdated(rowsAmount: number) {
    this.shown = rowsAmount;
  }

  private onSuccess(suppliers) {
    this.rows = suppliers.map((el, index) => new SupplierTablePreview(el, index));
    this.total = suppliers.length;
    this.loadingIndicator = false;
  }

  private onError() {
    this.loadingIndicator = false;
    this.notificationsService.danger('Error', 'Unable to load suppliers');
  }
  
}
