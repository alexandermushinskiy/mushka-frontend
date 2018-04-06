import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SuppliersTableComponent } from './suppliers-table/suppliers-table.component';
import { SupplierModalComponent } from './shared/widgets/supplier-modal/supplier-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    SuppliersListComponent,
    SuppliersTableComponent,
    SupplierModalComponent
  ],
  exports: [SuppliersListComponent]
})
export class SuppliersModule { }
