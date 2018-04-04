import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DatatableComponent } from 'ngx-datatable-with-ie-fix';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from 'ngx-webstorage';

import { UserPicSize } from '../../shared/enums/user-pic-size.enum';
import { UserPicType } from '../../shared/enums/user-pic-type.enum';
import { UnsubscriberComponent } from '../../shared/hooks/unsubscriber.component';
import { UserData } from '../../shared/models/user-data.model';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { DatatableColumn } from '../../shared/interfaces/datatable-column.interface';
import { ColumnConfiguration } from '../../shared/models/column-configuration.model';
import { ProductTablePreview } from '../shared/models/product-table-preview';
import { columnsConfig } from '../shared/constants/columns-config.const';
import { UserSettingsService } from '../../core/api/user-settings.service';
import { propertiesToFilter } from '../shared/constants/properties-to-filter.const';

// import { ReadReceiptService } from '../../core/api/read-receipt.service';
// import { FileHelper } from '../../shared/utils/file-helper';

// import { DatatableQuickFilterConfig } from '../../shared/interfaces/datatable-quick-filter-config';
// import { WorklistFilterService } from '../../core/worklist-filter/worklist-filter.service';

@Component({
  selector: 'psa-datatable',
  templateUrl: './psa-datatable.component.html',
  styleUrls: ['./psa-datatable.component.scss']
})
export class PsaDatatableComponent extends UnsubscriberComponent implements OnInit, OnDestroy {
  @ViewChild('datatable') datatable: DatatableComponent;
  @ViewChild('totalColumn') totalCol: TemplateRef<any>;
  @ViewChild('sizesColumn') sizesCol: TemplateRef<any>;

  // @ViewChild('hotColumn') hotCol: TemplateRef<any>;
  // @ViewChild('flowColumn') flowCol: TemplateRef<any>;
  // @ViewChild('severityColumn') severityCol: TemplateRef<any>;
  // @ViewChild('tasksColumn') tasksCol: TemplateRef<any>;
  // @ViewChild('sloganColumn') sloganCol: TemplateRef<any>;
  // @ViewChild('statusColumn') statusCol: TemplateRef<any>;
  // @ViewChild('collaborationColumn') collaborationCol: TemplateRef<any>;
  // @ViewChild('userPicsColumn') userPicsCol: TemplateRef<any>;
  // @ViewChild('csrTypeColumn') csrTypeCol: TemplateRef<any>;
  // @ViewChild('timeColumn') timeCol: TemplateRef<any>;
  // @ViewChild('workgroupsColumn') workgroupsCol: TemplateRef<any>;
  // @ViewChild('csrNumberColumn') csrNumberCol: TemplateRef<any>;
  // @ViewChild('subscribersColumn') subscribersCol: TemplateRef<any>;

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
  rowsData: ProductTablePreview[];
  userPicTypeEnum = UserPicType;
  userPicSizeEnum = UserPicSize;
  investigationLead: UserData;
  selectedTickets = [];
  headerHeight: number;
  //customTextFilters: { [name: string]: { filterText?: string, values?: string[] } } = {};
  hasData = false;

  readonly maxShownUsers = 3;

  private initialRowsData: ProductTablePreview[]; //TicketTablePreview[];
  private columnsConfigurationSnapshot: ColumnConfiguration[];
  private columnsDictionary: {};
  private datatableConfig = columnsConfig;
  private routeChangeTimeout = null;
  private selectedRowId: string;
  private filterText: string;
  private readonly ericssonResponsibleCoulumn = 'Ericsson Responsible';
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
//debugger;
    this.init(this.userSettingsService.getDefaultUserSettings(Object.keys(this.datatableConfig)));
  }

  readTicket(row: any) {
  //   this.onTicketRead.emit();

  //   if (this.shouldCheckUnreadCsr && !row.isRead) {
  //     this.readReceiptService.updateUnread(this.isWorklist);
  //   }
  }

  onSelect({ selected }) {
    this.selectedTickets.splice(0, this.selectedTickets.length);
    this.selectedTickets.push(...selected);
    this.onMultipleTicketsSelected.emit(selected);
    this.router.navigate([], {
      relativeTo: this.activeRoute
    });
  }

  canBeFiltered(prop) {
  //   const property = this.columnsDictionary[prop];
  //   return property ? this.datatableConfig[property].canBeFiltered : false;
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

  onReorder({ prevValue, newValue }) {
    const firstColumnName = this.getInitialColumnName(this.columnsData[prevValue].prop);
    const secondColumnName = this.getInitialColumnName(this.columnsData[newValue].prop);
    // this.columnsData = this.userSettingsService.moveElements(this.columnsData, prevValue, newValue);
    // this.userSettingsService.changeColumnsOrder(firstColumnName, secondColumnName)
    //   .subscribe(
    //     (res) => this.columnsConfigurationSnapshot = res,
    //     (err: string) => this.onError(err)
    //   );
  }

  onResize({ column, newValue }) {
    // const columnName = this.getInitialColumnName(column.prop);
    // this.userSettingsService.updateColumnWidth(columnName, newValue)
    //   .subscribe(
    //     (res) => this.columnsConfigurationSnapshot = res,
    //     (err: string) => this.onError(err)
    //   );
  }

  onExportAllToCSV(fileSuffix: string) {
    // FileHelper.toCSVFormat(
    //   `CSR-H_${fileSuffix}`,
    //   [this.getExportedColumnTitles()].concat(this.initialRowsData),
    //   this.getExportedProps()
    // );
  }

  onExportFilteredToCSV(fileSuffix: string) {
    // FileHelper.toCSVFormat(
    //   `CSR-H_${fileSuffix}`,
    //   [this.getExportedColumnTitles()].concat(this.rowsData),
    //   this.getExportedProps()
    // );
  }

  onCustomColumnFilter(column: DatatableColumn, filterText: string, values?: string[]) {
    // if (!filterText && (!values || !values.length)) {
    //   delete this.customTextFilters[column.prop];
    // } else {
    //   if (!this.customTextFilters[column.prop]) {
    //     this.customTextFilters[column.prop] = {};
    //   }
    //   this.customTextFilters[column.prop].filterText = filterText.trim().toLowerCase();
    //   this.customTextFilters[column.prop].values = values;
    // }

    // this.worklistFilterService.setWorklistFilters(this.customTextFilters);
    // this.filter();
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
        } else if (column.name === this.ericssonResponsibleCoulumn) {
          return prev.concat(this.getUserNamesAndSignumsArray(row));
        } else {
          prev.push(row[column.prop]);
        }
        return prev;
      }, [])])).sort();

      if (column.name === this.ericssonResponsibleCoulumn) {
        uniqueValues.unshift('Unassigned');
      }

      return uniqueValues;
    }
    return [];
  }

  resetFilter() {
    //this.customTextFilters = {};
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
    // const customFiltersList = Object.keys(this.customTextFilters);
    // if (!this.filterText && customFiltersList.length === 0) {
    //   this.rowsData = this.updateColumnsStatus(this.filterWithToggles(this.initialRowsData));
    //   return;
    // }

    let filteredRows = this.initialRowsData ? [...this.initialRowsData] : [];
    if (this.filterText) {
      filteredRows = this.filterByGlobalText(filteredRows);
    }
    // if (customFiltersList.length > 0) {
    //   filteredRows = this.filterByCustomText(customFiltersList, filteredRows);
    // }
    this.rowsData = this.updateColumnsStatus(this.filterWithToggles(filteredRows));
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

  private filterByCustomText(customFiltersList, filteredRows) {
    // return customFiltersList.reduce((memo, filter) => (
    //   memo.filter(row => {
    //     let valueToFilter = row[filter] ? row[filter].toString().trim().toLowerCase() : '';

    //     if (filter === 'ericssonResponsible') {
    //       valueToFilter = this.getUserNamesAndSignums(row);
    //       return this.customTextFilters[filter].values.some(responsible => valueToFilter.includes(responsible.toLowerCase()));
    //     }

    //     if (filter === 'hot') {
    //       valueToFilter = (!!valueToFilter ? filter : `not ${filter}`);
    //     }

    //     if (filter === 'workgroups') {
    //       valueToFilter = this.getWorkgroups(row);
    //     }

    //     if (this.customTextFilters[filter].values.length) {
    //       return this.customTextFilters[filter].values.find(el => el.toLowerCase() === valueToFilter);
    //     }
    //     return valueToFilter.includes(this.customTextFilters[filter].filterText);
    //   })
    // ), filteredRows);
  }

  private filterWithToggles(rowsData) {
    // Check if filterSettings has at least one active toggle
    let filteredRows = rowsData;
    // if (this.filterConfig && Object.values(this.filterConfig).includes(true)) {
    //   if (!this.isWorklist && this.filterConfig.unassignedOnly) {
    //     filteredRows = filteredRows.filter(this.filterByUnassigned);
    //   }
    //   if (this.filterConfig.unreadOnly) {
    //     filteredRows = filteredRows.filter(this.filterByUnread);
    //   }
    //   this.broadcastRowsUpdated(filteredRows.length);
    //   return filteredRows;
    // }
    this.broadcastRowsUpdated(rowsData.length);
    return rowsData;
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
  //   this.userSettingsService.updateAvailableColumns(this.columnsConfigurationSnapshot);
  }

  private onColumnToggled({ columnName, isActive }: { columnName: string, isActive: boolean }) {
    // this.loadingIndicator = true;
    // this.userSettingsService.updateColumnVisibility(columnName, isActive)
    //   .subscribe(
    //     (res) => {
    //       this.columnsConfigurationSnapshot = res;
    //       this.columnsData = this.createAvailableColumnsData(this.columnsConfigurationSnapshot);
    //       this.hideLoader();
    //     },
    //     (err) => this.onError(err)
    //   );
  }

  // private onPreviewSelected(previewId: string) {
  //   this.selectedRowId = previewId;
  //   if (this.rowsData) {
  //     this.rowsData = this.updateColumnsStatus(this.rowsData);
  //   }
  // }

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

  private onError(err) {
    this.notificationsService.danger('Error', err);
  }

  private getFakeRow() {
    return new ProductTablePreview({
      name: ''
    }, 0);
  }
}
