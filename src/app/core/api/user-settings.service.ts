import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ColumnConfiguration } from '../../shared/models/column-configuration.model';
import { columnsConfig } from '../../products/shared/constants/columns-config.const';

@Injectable()
export class UserSettingsService {

  private readonly defaultColumnWidth = 100;
  
  getDefaultUserSettings(availableColumns: string[]): ColumnConfiguration[] {
    return availableColumns.map(el => this.getColumn(el));
  }
  
  // changeColumnsSort(columnName: string, order: string) {
  //   this.availableColumnsConfiguration.forEach(c => c.sort = {});
  //   const column = this.availableColumnsConfiguration.find(el => el.name === columnName);
  //   if (column) {
  //     column.sort = { order };
  //   }
  //   return this.updateColumnsInPreferences(this.availableColumnsConfiguration);
  // }

  private getColumn(name: string, isVisible: boolean = true): ColumnConfiguration {
    return {
      name: name,
      width: columnsConfig[name] ? columnsConfig[name].width : this.defaultColumnWidth,
      visible: isVisible,
      sort: {},
      filters: []
    };
  }
}
