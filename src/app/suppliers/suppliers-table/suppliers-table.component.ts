import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DatatableComponent } from 'ngx-datatable-with-ie-fix';
import { LocalStorage } from 'ngx-webstorage';

import { DatatableColumn } from '../../shared/interfaces/datatable-column.interface';
import { ColumnConfiguration } from '../../shared/models/column-configuration.model';
import { SupplierTablePreview } from '../shared/models/supplier-table-preview';
import { columnsConfig } from '../shared/constants/columns-config.const';
import { propertiesToFilter } from '../shared/constants/properties-to-filter.const';
import { FileHelper } from '../../shared/utils/file-helper';
import { PsaDatatableComponent } from '../../shared/hooks/psa-datatable.component';

@Component({
  selector: 'psa-suppliers-table',
  templateUrl: './suppliers-table.component.html',
  styleUrls: ['./suppliers-table.component.scss']
})
export class SuppliersTableComponent extends PsaDatatableComponent implements OnInit {
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

  @Output() onRowsUpdated = new EventEmitter<number>();

  rowsData: SupplierTablePreview[];
  private initialRowsData: SupplierTablePreview[];

  constructor() {
    super(columnsConfig, propertiesToFilter);
  }

  ngOnInit() {
    super.ngOnInit();
    this.init(this.cols, this.headerTpl);
  }

  onFilter(filterText: string) {
    this.filterText = filterText;
    this.filter();
  }

  onTableSort({ sorts }, rows?: SupplierTablePreview[]) {
    const { dir, prop, initSort } = sorts[0];
    const rowsData = rows || this.rowsData;
    if (rowsData && rowsData.length > 0) {
      switch (dir) {
        case 'asc':
          return this.updateColumnsStatus(rowsData.sort((a, b) => this.sortByProp(a[prop], b[prop])));
        case 'desc':
        default:
          return this.updateColumnsStatus(rowsData.sort((a, b) => this.sortByProp(b[prop], a[prop])));
      }
    }
  }

  onExportAllToCSV(fileSuffix: string) {
    super.onExportToCSV(fileSuffix, this.initialRowsData);
  }

  onExportFilteredToCSV(fileSuffix: string) {
    super.onExportToCSV(fileSuffix, this.rowsData);
  }

  getExportedProps() {
    return this.columnsData
      .map((column) => column.exportProp || column.prop);
  }

  resetFilter() {
    this.filter();
  }

  sort() {
    const sortColumn = this.columnsConfigurationSnapshot.find(c => Object.keys(c.sort).length > 0);
    const sort = sortColumn
      ? { dir: sortColumn.sort.order, prop: sortColumn.name }
      : { dir: 'asc', prop: 'name' };
    this.sorts = [sort];
    this.rowsData = this.onTableSort({ sorts: [{ ...{ initSort: true }, ...sort }] }, this.initialRowsData);
  }

  filter() {
    let filteredRows = this.initialRowsData ? [...this.initialRowsData] : [];
    if (this.filterText) {
      filteredRows = this.filterByGlobalText(filteredRows);
    }

    this.rowsData = this.updateColumnsStatus(filteredRows);
    this.broadcastRowsUpdated(filteredRows.length);
    this.recalculateTable();
  }

  getFakeRow() {
    return new SupplierTablePreview({
      name: ''
    }, 0);
  }

  private recalculateTable() {
    setTimeout(() => {
      this.datatable.recalculate();
    }, 0);
  }

  private broadcastRowsUpdated(length: number) {
    setTimeout(() => {
      this.onRowsUpdated.emit(length);
    }, 0);
  }

}
