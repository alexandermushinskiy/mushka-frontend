import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PackagesComponent } from './packages/packages.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    PackagesComponent
  ],
  exports: [PackagesComponent]
})
export class PackagesModule { }
