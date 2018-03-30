import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SuppliersComponent } from './suppliers/suppliers.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SuppliersComponent
  ],
  exports: [SuppliersComponent]
})
export class SuppliersModule { }
