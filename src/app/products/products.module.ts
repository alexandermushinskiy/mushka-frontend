import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { PsaDatatableHeaderComponent } from './psa-datatable-header/psa-datatable-header.component';
import { PsaDatatableComponent } from './psa-datatable/psa-datatable.component';
import { PsaDatatableOptionsComponent } from './psa-datatable-options/psa-datatable-options.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    PsaDatatableHeaderComponent,
    PsaDatatableOptionsComponent,
    PsaDatatableComponent,
    ProductsComponent,
    ProductsListComponent
  ],
  exports: [ProductsComponent]
})
export class ProductsModule { }
