import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PartnersComponent } from './partners/partners.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    PartnersComponent
  ],
  exports: [PartnersComponent]
})
export class PartnersModule { }
