import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { SearchFormComponent } from '../search-form/search-form.component';
import { UnsubscriberComponent } from '../../hooks/unsubscriber.component';

@Component({
  selector: 'psa-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent extends UnsubscriberComponent implements OnInit, OnDestroy {
  @ViewChild(SearchFormComponent) searchFormComponent: SearchFormComponent;
  @Input() showSortingMenu = false;
  @Input() showSelectAll = false;
  @Input() showFilter = false;
  @Input() availableOptions: string[];
  @Input() selectedOptions: string[] = [];
  @Input() isMultipleAllowed = true;
  @Input() isLoadMoreAllowed = false;
  @Input() isRemoteFiltering = false;
  @Output() onOptionChanged = new EventEmitter<string>();
  @Output() onLoadMore = new EventEmitter<string>();
  @Output() onFilter = new EventEmitter<string>();
  @Output() onClose = new EventEmitter();

  keywords = '';
  isFiltered = false;
  private readonly parametersDelimiter = '; ';

  get filteredOptions(): string[] {
    return this.keywords.length > 0
      ? this.availableOptions.filter(option => option.toLowerCase().includes(this.keywords.toLowerCase()))
      : this.availableOptions;
  }

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onClose.emit();
    super.ngOnDestroy();
  }

  optionChanged($event: any) {
    if ($event.currentTarget.checked) {
      this.selectedOptions.push($event.currentTarget.value);
    } else {
      const currentOptionIndex = this.selectedOptions.findIndex(option => option === $event.currentTarget.value);
      this.selectedOptions.splice(currentOptionIndex, 1);
    }

    this.onOptionChanged.emit(this.selectedOptions.join(this.parametersDelimiter));
  }

  isOptionsSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }

  isOptionsDisabled(currentOption: string): boolean {
    return !this.isMultipleAllowed && (this.selectedOptions.length > 0 && !this.isOptionsSelected(currentOption));
  }

  onSearch(keywords: string) {
    this.keywords = keywords;
    this.isFiltered = keywords.length > 0;
    this.onFilter.emit(keywords);
  }

  loadMore() {
    this.onLoadMore.emit(this.keywords);
  }
}
