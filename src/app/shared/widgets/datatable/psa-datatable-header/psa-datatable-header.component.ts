import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { SearchFormComponent } from '../../search-form/search-form.component';

@Component({
  selector: 'psa-datatable-header',
  templateUrl: './psa-datatable-header.component.html',
  styleUrls: ['./psa-datatable-header.component.scss']
})
export class PsaDatatableHeaderComponent implements OnInit {
  @ViewChild(SearchFormComponent) searchForm: SearchFormComponent;
  @Input() isCollapsed: false;
  @Input() total: number;
  @Input() availableColumns: string[];
  @Input() shown: number;
  @Input() isMenuToggleShown = true;
  @Input() title: string;

  @Output() onFilter = new EventEmitter<string>();
  @Output() onCollapseMenu = new EventEmitter<any>();
  @Output() onExportAllToCSV = new EventEmitter<string>();
  @Output() onExportFilteredToCSV = new EventEmitter<string>();
  @Output() onReload = new EventEmitter();
  @Output() onFilterReset = new EventEmitter();
  @Output() onAddItem = new EventEmitter();

  isLoading = false;
  currentFilter = '';

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
    this.onExportAllToCSV.emit(this.title);
  }

  exportFilteredToCSV() {
    this.onExportFilteredToCSV.emit(`${this.title}_filter_${this.currentFilter}`);
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
