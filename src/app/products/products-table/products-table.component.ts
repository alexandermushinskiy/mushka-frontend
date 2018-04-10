import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DatatableComponent } from 'ngx-datatable-with-ie-fix';

import { ColumnConfiguration } from '../../shared/models/column-configuration.model';
import { ProductTablePreview } from '../shared/models/product-table-preview';
import { columnsConfig } from '../shared/constants/columns-config.const';
import { propertiesToFilter } from '../shared/constants/properties-to-filter.const';
import { PsaDatatableComponent } from '../../shared/hooks/psa-datatable.component';

@Component({
  selector: 'psa-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent extends PsaDatatableComponent implements OnInit {
  @ViewChild('datatable') datatable: DatatableComponent;
  @ViewChild('totalColumn') totalCol: TemplateRef<any>;
  @ViewChild('sizesColumn') sizesCol: TemplateRef<any>;
  @ViewChild('headerTpl') headerTpl: TemplateRef<any>;

  @Input() loadingIndicator: boolean;
  @Input() cols: string[];

  @Input() set rows(data) {
    if (data && data.length > 0) {
      this.initialRowsData = data;
      this.hasData = true;
      this.sort();
      this.filter();
    } else {
      this.hasData = false;
      this.rowsData = [];
    }

    this.datatable.bodyComponent.updateOffsetY(0);
  }

  constructor() {
    super(columnsConfig, propertiesToFilter);
  }

  ngOnInit() {
    super.ngOnInit();
    this.init(this.datatable, this.cols, this.headerTpl);
  }

  onExportAllToCSV(fileSuffix: string) {
    super.onExportToCSV(fileSuffix, this.initialRowsData);
  }

  onExportFilteredToCSV(fileSuffix: string) {
    super.onExportToCSV(fileSuffix, this.rowsData);
  }

  getFakeRow() {
    return new ProductTablePreview({
      name: '',
      сode: '',
      createdOn: '',
      deliveriesNumber: 0,
      lastDeliveryDate: '',
      lastDeliveryCount: 0,
      totalCount: 0,
      sizes: []
    }, 0);
  }
}
