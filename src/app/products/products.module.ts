import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeviewModule } from 'ngx-treeview';

import { SharedModule } from '../shared/shared.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { CategoriesNavComponent } from './categories-nav/categories-nav.component';
import { CategoryModalComponent } from './shared/widgets/category-modal/category-modal.component';
import { ProductModalComponent } from './shared/widgets/product-modal/product-modal.component';
import { SizesHelperServices } from './shared/services/sizes-helper.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    TreeviewModule.forRoot()
  ],
  providers: [
    SizesHelperServices
  ],
  declarations: [
    ProductsTableComponent,
    ProductsListComponent,
    CategoriesNavComponent,
    CategoryModalComponent,
    ProductModalComponent
  ],
  exports: [ProductsListComponent]
})
export class ProductsModule { }
