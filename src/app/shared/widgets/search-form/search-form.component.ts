import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UnsubscriberComponent } from '../../hooks/unsubscriber.component';

@Component({
  selector: 'psa-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent extends UnsubscriberComponent implements OnInit {
  @Input() type: 'solid' | 'outline' = 'outline';
  @Input() disabled = false;
  @Input() size: 'default' | 'large' = 'default';
  @Input() placeholder = 'Поиск...';
  @Input() defaultValue = '';

  @Output() onSearch = new EventEmitter();
  @ViewChild('searchBox') searchElementRef: ElementRef;

  private searchTerms$ = new Subject<string>();

  ngOnInit() {
    this.searchTerms$
      .debounceTime(300)
      .distinctUntilChanged()
      .takeUntil(this.ngUnsubscribe$)
      .subscribe((val: string) => this.onSearch.emit(val));
  }

  valueChanged(value) {
    this.searchTerms$.next(value);
  }

  search() {
    return this.searchTerms$.asObservable();
  }

  reset() {
    this.searchElementRef.nativeElement.value = '';
    this.valueChanged('');
  }
}
