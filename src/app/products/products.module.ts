import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { PsaDatatableHeaderComponent } from './psa-datatable-header/psa-datatable-header.component';
import { PsaDatatableComponent } from './psa-datatable/psa-datatable.component';
import { PsaDatatableOptionsComponent } from './psa-datatable-options/psa-datatable-options.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    PsaDatatableHeaderComponent,
    PsaDatatableOptionsComponent,
    PsaDatatableComponent,
    ProductComponent,
    ProductsListComponent
  ],
  exports: [ProductsListComponent]
})
export class ProductsModule { }
