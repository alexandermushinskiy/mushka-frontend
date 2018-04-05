import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { PsaDatatableComponent } from './psa-datatable/psa-datatable.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    PsaDatatableComponent,
    ProductComponent,
    ProductsListComponent
  ],
  exports: [ProductsListComponent]
})
export class ProductsModule { }
