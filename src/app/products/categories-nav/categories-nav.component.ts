import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TreeviewItem } from 'ngx-treeview';

import { treeviewConfig } from '../shared/constants/treeview-config.const';
import { UnsubscriberComponent } from '../../shared/hooks/unsubscriber.component';

@Component({
  selector: 'psa-categories-nav',
  templateUrl: './categories-nav.component.html',
  styleUrls: ['./categories-nav.component.scss']
})
export class CategoriesNavComponent extends UnsubscriberComponent implements OnInit {
  @Input() set categories(categoriesTree: TreeviewItem[]) {
    if (categoriesTree) {
      this.internalCategories = categoriesTree;
      this.topLevelCategories = categoriesTree.map(el => el.value);
    }
  }

  @Input() parentRoute: string;
  @Input() isLoading = false;
  @Input() disallowClickOnTopLevelItems = false;

  config = treeviewConfig;
  filterText: string;
  internalCategories: TreeviewItem[];
  topLevelCategories: string[];
  selectedCategoryId: string;
  
  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
    // this.workgroupsService
    //   .getSelectedWorkgroup()
    //   .takeUntil(this.ngUnsubscribe$)
    //   .subscribe(res => this.selectedWorkgroupId = res.id);
  }

  onFilterChange(text: string, callback: (filterText: string) => void) {
    callback(text);
  }

  onExpandCategory(item: TreeviewItem, callback: () => void) {
    callback();
  }

  onSelectCategory(item: TreeviewItem) {
    this.router.navigate([this.parentRoute, { id: item.value }]);
  }

  // isTopLevel(value: string) {
  //   return this.disallowClickOnTopLevelItems && this.topLevelCategories.includes(value);
  // }
}
