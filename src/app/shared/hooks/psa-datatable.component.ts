import { OnInit } from '@angular/core';

import { DatatableColumn } from '../interfaces/datatable-column.interface';
import { ColumnConfiguration } from '../models/column-configuration.model';
import { FileHelper } from '../utils/file-helper';

export abstract class PsaDatatableComponent implements OnInit {
  sorts: { dir: string, prop: string }[];
  columnsData: DatatableColumn[];
  headerHeight: number;
  hasData = false;
  columnsConfigurationSnapshot: ColumnConfiguration[];
  columnsDictionary: {};
  selectedRowId: string;
  filterText: string;
  datatableConfig: { [name: string]: DatatableColumn };
  propertiesToFilter: { [name: string]: string };

  readonly fakeRowClassName = 'fake-row';
  readonly defaultColumnWidth = 100;
  readonly fixedHeaderHeight = {
    collapsed: 40,
    expanded: 40
  };

  constructor(datatableConfig, propertiesToFilter) {
    this.datatableConfig = datatableConfig;
    this.propertiesToFilter = propertiesToFilter;
  }

  abstract getFakeRow();

  ngOnInit() {
    this.headerHeight = this.fixedHeaderHeight.collapsed;
  }

  getRowClass(row: any) {
    return row.className;
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

  getColumnsConfigurations(): ColumnConfiguration[] {
    const availableColumns = Object.keys(this.datatableConfig);

    return availableColumns.map((columnName: string) => {
      return {
        name: columnName,
        width: this.datatableConfig[name] ? this.datatableConfig[name].width : this.defaultColumnWidth,
        visible: true,
        sort: {},
        filters: []
      };
    });
  }

  onExportToCSV(fileSuffix: string, rowsData: any[]) {
    FileHelper.toCSVFormat(
      `MUSHKA-PSA_${fileSuffix}`,
      [this.getExportedColumnTitles()].concat(rowsData),
      this.getExportedProps()
    );
  }

  sortByProp(a, b) {
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

  filterByGlobalText(filteredRows) {
    const columns = this.columnsData.map(el => el.name);
    const propertiesToFilterKeys = Object.keys(this.propertiesToFilter);
    this.filterText = this.filterText.toLowerCase().trim();

    return filteredRows.filter(row => {
      let filterFields = [];
      columns.forEach(column => {
        if (propertiesToFilterKeys.includes(column) && row[this.propertiesToFilter[column]]) {
          filterFields.push(row[this.propertiesToFilter[column]].toString().toLowerCase());
        }
      });
      return filterFields.some(el => el.includes(this.filterText));
    });
  }

  createColumnsDictionary(configurations: ColumnConfiguration[]): {} {
    return this.columnsDictionary = configurations.reduce((dictionary, cellConfig) => {
      if (this.datatableConfig[cellConfig.name]) {
        dictionary[this.datatableConfig[cellConfig.name].prop] = cellConfig.name;
      }
      return dictionary;
    }, {});
  }

  updateColumnsStatus(rows: any[] = []) {
    const updatedColumns = rows.map((el: any, index) => {
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

}
