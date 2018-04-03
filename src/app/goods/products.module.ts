import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ProductsComponent
  ],
  exports: [ProductsComponent]
})
export class ProductsModule { }
