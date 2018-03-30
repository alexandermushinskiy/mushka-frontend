import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    OrdersComponent
  ],
  exports: [OrdersComponent]
})
export class OrdersModule { }
