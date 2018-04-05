import { Component, EventEmitter, Input, Output, ViewChild, OnDestroy } from '@angular/core';

import { UnsubscriberComponent } from '../../shared/hooks/unsubscriber.component';
import { SearchFormComponent } from '../../shared/widgets/search-form/search-form.component';

@Component({
  selector: 'psa-datatable-options',
  templateUrl: './psa-datatable-options.component.html',
  styleUrls: ['./psa-datatable-options.component.scss']
})
export class PsaDatatableOptionsComponent extends UnsubscriberComponent implements OnDestroy {
  @ViewChild(SearchFormComponent) searchFormComponent: SearchFormComponent;
  @Input() showSelectAll = false;
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

  get isAllSelected(): boolean {
    return !this.filteredOptions.some(opt => !this.selectedOptions.includes(opt));
  }

  get filteredOptions(): string[] {
    return this.keywords.length > 0
      ? this.availableOptions.filter(option => option.toLowerCase().includes(this.keywords.toLowerCase()))
      : this.availableOptions;
  }

  constructor() {
    super();
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

    this.emitChangedOptions();
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

  selectAllChanged(isChecked: boolean) {
    this.selectedOptions = isChecked
      ? this.selectedOptions.concat(this.filteredOptions.filter(opt => !this.selectedOptions.includes(opt)))
      : this.selectedOptions.filter(opt => !this.filteredOptions.includes(opt));

    this.emitChangedOptions();
  }

  private emitChangedOptions() {
    this.onOptionChanged.emit(this.selectedOptions.join(this.parametersDelimiter));
  }
}
