import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { DatatableComponent } from 'ngx-datatable-with-ie-fix';

import { PsaDatatableComponent } from '../../shared/hooks/psa-datatable.component';
import { columnsConfig } from '../shared/constants/columns-config.const';
import { ServiceItemTablePreview } from '../shared/models/service-item-table-preview.model';

@Component({
  selector: 'psa-services-table',
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.scss']
})
export class ServicesTableComponent extends PsaDatatableComponent implements OnInit {
  @ViewChild('datatable') datatable: DatatableComponent;
  @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
  @ViewChild('costPerItemCol') costPerItemCol: TemplateRef<any>;
  @ViewChild('totalCostCol') totalCostCol: TemplateRef<any>;
  @Input() cols: string[];
  @Input() set rows(data) {
    this.initRows(data);

    this.datatable.bodyComponent.updateOffsetY(0);
  }
  
  constructor() {
    super(columnsConfig, {});
  }

  ngOnInit() {
    super.ngOnInit();
    this.init(this.datatable, this.cols, this.headerTpl);
  }

  getFakeRow() {
    return new ServiceItemTablePreview({
      product: {
        name: ''
      },
      amount: 0,
      costPerItem: 0,
      total: 0
    }, 0);
  }
}
