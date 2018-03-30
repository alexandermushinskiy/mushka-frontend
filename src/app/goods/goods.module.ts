import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GoodsComponent } from './goods/goods.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    GoodsComponent
  ],
  exports: [GoodsComponent]
})
export class GoodsModule { }
