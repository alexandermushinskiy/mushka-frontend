import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from 'ngx-datatable-with-ie-fix';

import { PsaDatatableComponent } from '../../shared/hooks/psa-datatable.component';
import { ProductItemTablePreview } from '../shared/models/product-item-table-preview.model';
import { columnsConfig } from '../shared/constants/columns-config.const';
import { availableColumns } from '../../shared/constants/available-columns.const';
import { propertiesToFilter } from '../shared/constants/properties-to-filter.const';

@Component({
  selector: 'psa-delivery-table',
  templateUrl: './delivery-table.component.html',
  styleUrls: ['./delivery-table.component.scss']
})
export class DeliveryTableComponent extends PsaDatatableComponent implements OnInit {
  @ViewChild('datatable') datatable: DatatableComponent;
  @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
  @ViewChild('costPerItemCol') costPerItemCol: TemplateRef<any>;
  @ViewChild('totalCostCol') totalCostCol: TemplateRef<any>;
  @ViewChild('costCol') costCol: TemplateRef<any>;
  @Input() cols: string[];
  @Input() set rows(data) {
    this.initRows(data);

    this.datatable.bodyComponent.updateOffsetY(0);
  }

  loadingIndicator: false;

  constructor() {
    super(columnsConfig, propertiesToFilter);
  }

  ngOnInit() {
    super.ngOnInit();
    this.init(this.datatable, this.cols, this.headerTpl);
  }

  getFakeRow() {
    return new ProductItemTablePreview({
      product: {
        name: ''
      },
      amount: 0,
      costPerItem: 0,
      total: 0,
      notes: ''
    }, 0);
  }
}
