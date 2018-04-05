import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SuppliersListComponent } from './suppliers/suppliers-list.component';
import { PsaDatatableComponent } from './psa-datatable/psa-datatable.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SuppliersListComponent,
    PsaDatatableComponent
  ],
  exports: [SuppliersListComponent]
})
export class SuppliersModule { }
