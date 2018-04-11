import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeviewModule } from 'ngx-treeview';

import { SharedModule } from '../shared/shared.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { CategoriesNavComponent } from './categories-nav/categories-nav.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    TreeviewModule.forRoot()
  ],
  declarations: [
    ProductsTableComponent,
    ProductsListComponent,
    CategoriesNavComponent
  ],
  exports: [ProductsListComponent]
})
export class ProductsModule { }
