import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsTableComponent } from './products-table/products-table.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductsTableComponent,
    ProductComponent,
    ProductsListComponent
  ],
  exports: [ProductsListComponent]
})
export class ProductsModule { }
