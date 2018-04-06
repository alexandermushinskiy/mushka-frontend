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

  readonly fakeRowClassName = 'fake-row';
  readonly defaultColumnWidth = 100;
  readonly fixedHeaderHeight = {
    collapsed: 40,
    expanded: 40
  };

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

  getColumnsConfigurations(availableColumns: string[], columnsConfig: { [name: string]: DatatableColumn }): ColumnConfiguration[] {
    return availableColumns.map((columnName: string) => {
      return {
        name: columnName,
        width: columnsConfig[name] ? columnsConfig[name].width : this.defaultColumnWidth,
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

}
