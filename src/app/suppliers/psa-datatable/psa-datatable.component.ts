import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent } from 'ngx-datatable-with-ie-fix';
import { LocalStorage } from 'ngx-webstorage';

import { UserPicSize } from '../../shared/enums/user-pic-size.enum';
import { UserPicType } from '../../shared/enums/user-pic-type.enum';
import { UnsubscriberComponent } from '../../shared/hooks/unsubscriber.component';
import { UserData } from '../../shared/models/user-data.model';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { DatatableColumn } from '../../shared/interfaces/datatable-column.interface';
import { ColumnConfiguration } from '../../shared/models/column-configuration.model';
import { SupplierTablePreview } from '../shared/models/supplier-table-preview';
import { columnsConfig } from '../shared/constants/columns-config.const';
import { UserSettingsService } from '../../core/api/user-settings.service';
import { propertiesToFilter } from '../shared/constants/properties-to-filter.const';
import { FileHelper } from '../../shared/utils/file-helper';

@Component({
  selector: 'psa-datatable',
  templateUrl: './psa-datatable.component.html',
  styleUrls: ['./psa-datatable.component.scss']
})
export class PsaDatatableComponent extends UnsubscriberComponent implements OnInit, OnDestroy {
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
    this.selectedTickets = [];
    this.onMultipleTicketsSelected.emit(this.selectedTickets);
  }

  @Output() onMultipleTicketsSelected = new EventEmitter<any[]>();
  @Output() onGotColumnsConfiguration = new EventEmitter<any[]>();
  @Output() onRowsUpdated = new EventEmitter<number>();
  @Output() onTicketRead = new EventEmitter<void>();

  sorts: { dir: string, prop: string }[];
  columnsData: DatatableColumn[];
  rowsData: SupplierTablePreview[];
  userPicTypeEnum = UserPicType;
  userPicSizeEnum = UserPicSize;
  investigationLead: UserData;
  selectedTickets = [];
  headerHeight: number;
  hasData = false;

  readonly maxShownUsers = 3;

  private initialRowsData: SupplierTablePreview[];
  private columnsConfigurationSnapshot: ColumnConfiguration[];
  private columnsDictionary: {};
  private datatableConfig = columnsConfig;
  private routeChangeTimeout = null;
  private selectedRowId: string;
  private filterText: string;
  private readonly fakeRowClassName = 'fake-row';

  private readonly fixedHeaderHeight = {
    collapsed: 40,
    expanded: 40
  };

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private userSettingsService: UserSettingsService,
              private notificationsService: NotificationsService) {
    super();
  }

  ngOnInit() {
    this.headerHeight = this.fixedHeaderHeight.collapsed;

    this.init(this.userSettingsService.getDefaultUserSettings(Object.keys(this.datatableConfig)));
  }

  onSelect({ selected }) {
    this.selectedTickets.splice(0, this.selectedTickets.length);
    this.selectedTickets.push(...selected);
    this.onMultipleTicketsSelected.emit(selected);
    this.router.navigate([], {
      relativeTo: this.activeRoute
    });
  }

  trackByIndex(index) {
    return index;
  }

  onFilter(filterText: string) {
    this.filterText = filterText;
    this.filter();
  }

  onTableSort({ sorts }, rows?: SupplierTablePreview[]) {
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

  getValuesList(column: DatatableColumn): string[] {
    if (column.predefinedValues && this.initialRowsData) {
      const uniqueValues = Array.from(new Set([...this.initialRowsData.reduce((prev, row) => {
        if (!!row[column.prop] === row[column.prop]) {
          prev.push(row[column.prop] ? `${column.name}` : `Not ${column.name}`);
        } else {
          prev.push(row[column.prop]);
        }
        return prev;
      }, [])])).sort();

      return uniqueValues;
    }
    return [];
  }

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

  private filterByUnread(row) {
    return !row.isRead;
  }

  private filterByUnassigned(row) {
    return row.unassigned;
  }

  private getUserNamesAndSignums(row) {
    return row.ericssonResponsible.reduce((prev, curr) => {
      return prev.concat(
        curr.username ? curr.username.toLowerCase() : '',
        curr.originalName ? curr.originalName.toLowerCase() : '');
    }, []).join(' ');
  }

  private getUserNamesAndSignumsArray(row) {
    return row.ericssonResponsible.reduce((prev, curr) => {
      if (curr.username) {
        prev.push(`${curr.username} ${ curr.originalName ? curr.originalName : ''}`);
      }

      return prev;
    }, []);
  }

  private getWorkgroups(row) {
    return row.workgroups.map(workgroup => workgroup.name.toLowerCase()).join(' ');
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

  private updateColumnsStatus(rows: SupplierTablePreview[] = []) {
    const updatedColumns = rows.map((el: SupplierTablePreview, index) => {
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

  private onError(err) {
    this.notificationsService.danger('Error', err);
  }

  private getFakeRow() {
    return new SupplierTablePreview({
      name: ''
    }, 0);
  }
}
