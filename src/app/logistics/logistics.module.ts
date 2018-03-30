import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LogisticsComponent } from './logistics/logistics.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LogisticsComponent
  ],
  exports: [LogisticsComponent]
})
export class LogisticsModule { }
