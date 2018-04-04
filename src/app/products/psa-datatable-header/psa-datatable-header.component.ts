import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

//import { WorkgroupsService } from '../../core/api/workgroups.service';
import { NotificationsService } from '../../core/notifications/notifications.service';
//import { DatatableQuickFilterConfig } from '../../shared/interfaces/datatable-quick-filter-config';
import { SearchFormComponent } from '../../shared/widgets/search-form/search-form.component';
//import { CsrDatatableSettingsComponent } from '../../shared/widgets/csr-datatable-settings/csr-datatable-settings.component';
//import { TicketsListType } from '../../shared/enums/tickets-list-type.enum';

@Component({
  selector: 'psa-datatable-header',
  templateUrl: './psa-datatable-header.component.html',
  styleUrls: ['./psa-datatable-header.component.scss']
})
export class PsaDatatableHeaderComponent implements OnInit {
  @ViewChild(SearchFormComponent) searchForm: SearchFormComponent;
  //@ViewChild(CsrDatatableSettingsComponent) datatableSettings: CsrDatatableSettingsComponent;
  @Input() isCollapsed: false;
  @Input() total: number;
  @Input() availableColumns: string[];
  @Input() shown: number;
  // @Input() ticketsListType: TicketsListType = TicketsListType.WORKGROUPS;
  @Input() isMenuToggleShown = true;

  @Output() onFilter = new EventEmitter<string>();
  @Output() onCollapseMenu = new EventEmitter<any>();
  //@Output() onFavChanged = new EventEmitter<boolean>();
  @Output() onExportAllToCSV = new EventEmitter<string>();
  @Output() onExportFilteredToCSV = new EventEmitter<string>();
  @Output() onReload = new EventEmitter();
  @Output() onFilterReset = new EventEmitter();
  @Output() onAddItem = new EventEmitter();
  //@Output() onQuickFilter = new EventEmitter<DatatableQuickFilterConfig>();
  //@Output() onQuickFilterBySubgroups = new EventEmitter<boolean>();
  //@Output() onSave = new EventEmitter();

  isLoading = false;

  //currentWorkgroup: { id: string, name: string };
  currentFilter = '';
  //ticketsListTypes = TicketsListType;
  header = '- HEADER -';

  constructor(private notificationsService: NotificationsService,
              private storage: LocalStorageService) {
  }

  ngOnInit() {
  }

  addItem() {
    this.onAddItem.emit();
  }

  filter(value: string) {
    this.onFilter.emit(value);
    this.currentFilter = value;
  }

  exportAllToCSV() {
    this.onExportAllToCSV.emit(this.getExportedFileSuffix());
  }

  exportFilteredToCSV() {
    this.onExportFilteredToCSV.emit(`${this.getExportedFileSuffix()}_filter_${this.currentFilter}`);
  }

  getExportedFileSuffix() {
    return '-fix me-';
    // return this.ticketsListType === TicketsListType.WORKGROUPS ? this.currentWorkgroup.name : this.ticketsListType;
  }

  reloadTickets() {
    this.onReload.emit();
  }

  resetFilters() {
    this.searchForm.reset();
    this.filter('');
    this.onFilterReset.emit();
  }

  private hideLoader() {
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }
}
