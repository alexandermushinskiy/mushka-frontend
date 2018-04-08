import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { DeliveryComponent } from './delivery/delivery.component';
import { SuppliersDropdownComponent } from './shared/widgets/suppliers-dropdown/suppliers-dropdown.component';

@NgModule({
  imports: [
    TypeaheadModule.forRoot(),
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    DeliveryComponent,
    SuppliersDropdownComponent
  ],
  exports: [DeliveryComponent]
})
export class DeliveryModule { }
