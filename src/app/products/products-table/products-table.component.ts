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

  @Output() onRowsUpdated = new EventEmitter<number>();

  rowsData: ProductTablePreview[];
  private initialRowsData: ProductTablePreview[];
  private datatableConfig = columnsConfig;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.init();
  }

  onFilter(filterText: string) {
    this.filterText = filterText;
    this.filter();
  }

  onTableSort({ sorts }, rows?: ProductTablePreview[]) {
    const { dir, prop, initSort } = sorts[0];
    const rowsData = rows || this.rowsData;
    if (rowsData && rowsData.length > 0) {
      // if (!initSort) {
      //   this.userSettingsService.changeColumnsSort(prop, dir)
      //     .subscribe((res) => this.columnsConfigurationSnapshot = res,
      //       (err: string) => this.onError(err)
      //     );
      // }
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

  // getValuesList(column: DatatableColumn): string[] {
  //   if (column.predefinedValues && this.initialRowsData) {
  //     const uniqueValues = Array.from(new Set([...this.initialRowsData.reduce((prev, row) => {
  //       if (!!row[column.prop] === row[column.prop]) {
  //         prev.push(row[column.prop] ? `${column.name}` : `Not ${column.name}`);
  //       } else {
  //         prev.push(row[column.prop]);
  //       }
  //       return prev;
  //     }, [])])).sort();

  //     return uniqueValues;
  //   }
  //   return [];
  // }

  resetFilter() {
    this.filter();
  }

  private sort() {
    const sortColumn = this.columnsConfigurationSnapshot.find(c => Object.keys(c.sort).length > 0);
    const sort = sortColumn
      ? { dir: sortColumn.sort.order, prop: sortColumn.name }
      : { dir: 'asc', prop: 'name' };
    this.sorts = [sort];
    this.rowsData = this.onTableSort({ sorts: [{ ...{ initSort: true }, ...sort }] }, this.initialRowsData);
  }

  private filter() {
    let filteredRows = this.initialRowsData ? [...this.initialRowsData] : [];
    if (this.filterText) {
      filteredRows = this.filterByGlobalText(filteredRows);
    }

    this.rowsData = this.updateColumnsStatus(filteredRows);
    this.broadcastRowsUpdated(filteredRows.length);
    this.recalculateTable();
  }

  private recalculateTable() {
    setTimeout(() => {
      this.datatable.recalculate();
    }, 0);
  }

  private filterByGlobalText(filteredRows) {
    const columns = this.columnsData.map(el => el.name);
    const propertiesToFilterKeys = Object.keys(propertiesToFilter);
    this.filterText = this.filterText.toLowerCase().trim();

    return filteredRows.filter(row => {
      let filterFields = [];
      columns.forEach(column => {
        if (propertiesToFilterKeys.includes(column) && row[propertiesToFilter[column]]) {
          filterFields.push(row[propertiesToFilter[column]].toString().toLowerCase());
        }
      });
      return filterFields.some(el => el.includes(this.filterText));
    });
  }

  private broadcastRowsUpdated(length: number) {
    setTimeout(() => {
      this.onRowsUpdated.emit(length);
    }, 0);
  }

  private init() {
    const configurations = this.getColumnsConfigurations(Object.keys(this.datatableConfig), columnsConfig);

    this.columnsConfigurationSnapshot = [...configurations];
    this.columnsDictionary = this.createColumnsDictionary(this.columnsConfigurationSnapshot);
    this.columnsData = this.createAvailableColumnsData(this.columnsConfigurationSnapshot);
  }

  private createColumnsDictionary(configurations: ColumnConfiguration[]): {} {
    return this.columnsDictionary = configurations.reduce((dictionary, cellConfig) => {
      if (this.datatableConfig[cellConfig.name]) {
        dictionary[this.datatableConfig[cellConfig.name].prop] = cellConfig.name;
      }
      return dictionary;
    }, {});
  }

  private updateColumnsStatus(rows: ProductTablePreview[] = []) {
    const updatedColumns = rows.map((el: ProductTablePreview, index) => {
      return Object.assign(el, {
        className: (rows.length === 1 && el.className === this.fakeRowClassName)
          ? el.className
          : el.getClassName(index, el.id === this.selectedRowId)
      });
    });
    if (updatedColumns.length === 0) {
      return [this.getFakeRow()];
    }
    return updatedColumns;
  }

  private createAvailableColumnsData(columnsConfiguration: ColumnConfiguration[] = []): any[] {
    const colsToRender = [];
    columnsConfiguration.forEach((column) => {
      const currentColumn = { ...this.datatableConfig[column.name] };
      if (this.cols.includes(column.name) && currentColumn && column.visible) {
        if (typeof column.width === 'number') {
          currentColumn.width = column.width;
        }
        currentColumn.cellTemplate = this[currentColumn.cellTemplateName];
        currentColumn.headerTemplate = this.headerTpl;
        colsToRender.push(currentColumn);
      }
    });
    return colsToRender;
  }

  // private hideLoader() {
  //   super.hideLoader(this.loadingIndicator);
  // }

  private getFakeRow() {
    return new ProductTablePreview({
      name: ''
    }, 0);
  }
}
