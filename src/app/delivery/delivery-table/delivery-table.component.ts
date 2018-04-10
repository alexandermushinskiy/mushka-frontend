import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from 'ngx-datatable-with-ie-fix';

import { PsaDatatableComponent } from '../../shared/hooks/psa-datatable.component';
import { ProductTablePreview } from '../shared/models/product-table-preview.model';
import { columnsConfig } from '../shared/constants/columns-config.const';
import { availableColumns } from '../../shared/constants/available-columns.const';

@Component({
  selector: 'psa-delivery-table',
  templateUrl: './delivery-table.component.html',
  styleUrls: ['./delivery-table.component.scss']
})
export class DeliveryTableComponent extends PsaDatatableComponent implements OnInit {
  @ViewChild('datatable') datatable: DatatableComponent;
  @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
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

  loadingIndicator: false;

  constructor() {
    super(columnsConfig, {});
  }

  ngOnInit() {
    super.ngOnInit();
    this.init(this.datatable, this.cols, this.headerTpl);
  }

  getFakeRow() {
    return new ProductTablePreview({
      name: '',
      amount: 0,
      costPerItem: 0,
      total: 0
    }, 0);
  }
}
