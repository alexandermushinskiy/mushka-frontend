import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SuppliersListComponent } from './suppliers/suppliers-list.component';
import { SuppliersTableComponent } from './suppliers-table/suppliers-table.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SuppliersListComponent,
    SuppliersTableComponent
  ],
  exports: [SuppliersListComponent]
})
export class SuppliersModule { }
