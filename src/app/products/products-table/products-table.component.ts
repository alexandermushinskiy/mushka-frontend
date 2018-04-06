import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DatatableComponent } from 'ngx-datatable-with-ie-fix';
import { LocalStorage } from 'ngx-webstorage';

import { UnsubscriberComponent } from '../../shared/hooks/unsubscriber.component';
import { DatatableColumn } from '../../shared/interfaces/datatable-column.interface';
import { ColumnConfiguration } from '../../shared/models/column-configuration.model';
import { ProductTablePreview } from '../shared/models/product-table-preview';
import { columnsConfig } from '../shared/constants/columns-config.const';
import { propertiesToFilter } from '../shared/constants/properties-to-filter.const';
import { FileHelper } from '../../shared/utils/file-helper';

@Component({
  selector: 'psa-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent extends UnsubscriberComponent implements OnInit, OnDestroy {
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

  sorts: { dir: string, prop: string }[];
  columnsData: DatatableColumn[];
  rowsData: ProductTablePreview[];
  headerHeight: number;
  hasData = false;

  readonly maxShownUsers = 3;

  private initialRowsData: ProductTablePreview[];
  private columnsConfigurationSnapshot: ColumnConfiguration[];
  private columnsDictionary: {};
  private datatableConfig = columnsConfig;
  private routeChangeTimeout = null;
  private selectedRowId: string;
  private filterText: string;
  private readonly fakeRowClassName = 'fake-row';
  private readonly defaultColumnWidth = 100;

  private readonly fixedHeaderHeight = {
    collapsed: 40,
    expanded: 40
  };

  constructor() {
    super();
  }

  ngOnInit() {
    this.headerHeight = this.fixedHeaderHeight.collapsed;

    this.init(this.getColumnsConfigurations(Object.keys(this.datatableConfig)));
  }

  trackByIndex(index) {
    return index;
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
    FileHelper.toCSVFormat(
      `MUSHKA-PSA_${fileSuffix}`,
      [this.getExportedColumnTitles()].concat(this.initialRowsData),
      this.getExportedProps()
    );
  }

  onExportFilteredToCSV(fileSuffix: string) {
    FileHelper.toCSVFormat(
      `MUSHKA-PSA_${fileSuffix}`,
      [this.getExportedColumnTitles()].concat(this.rowsData),
      this.getExportedProps()
    );
  }

  getExportedProps() {
    return this.columnsData
      .map((column) => column.exportProp || column.prop);
  }

  getExportedColumnTitles() {
    return this.columnsData
      .reduce((columnTitles, column) => {
        return { ...columnTitles, [column.exportProp || column.prop]: column.name };
      }, {});
  }

  getRowClass(row: any) {
    return row.className;
  }

  ngOnDestroy() {
    clearTimeout(this.routeChangeTimeout);
    super.ngOnDestroy();
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

  private init(configurations: ColumnConfiguration[]) {
    this.columnsConfigurationSnapshot = [...configurations];
    this.columnsDictionary = this.createColumnsDictionary(this.columnsConfigurationSnapshot);
    this.columnsData = this.createAvailableColumnsData(this.columnsConfigurationSnapshot);
  }

  private getInitialColumnName(prop: string) {
    return this.columnsDictionary[prop] || prop;
  }

  private createColumnsDictionary(configurations: ColumnConfiguration[]): {} {
    return this.columnsDictionary = configurations.reduce((dictionary, cellConfig) => {
      if (this.datatableConfig[cellConfig.name]) {
        dictionary[this.datatableConfig[cellConfig.name].prop] = cellConfig.name;
      }
      return dictionary;
    }, {});
  }

  private sortByProp(a, b) {
    const aProp = a ? a.toString().toLowerCase().trim() : '';
    const bProp = b ? b.toString().toLowerCase().trim() : '';

    if (aProp < bProp) {
      return -1;
    }
    if (aProp > bProp) {
      return 1;
    }

    return 0;
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

  private hideLoader() {
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 300);
  }
  
  private getColumnsConfigurations(availableColumns: string[], isVisible: boolean = true): ColumnConfiguration[] {
    return availableColumns.map((columnName: string) => {
      return {
        name: columnName,
        width: columnsConfig[name] ? columnsConfig[name].width : this.defaultColumnWidth,
        visible: isVisible,
        sort: {},
        filters: []
      };
    });
  }

  private getFakeRow() {
    return new ProductTablePreview({
      name: ''
    }, 0);
  }
}