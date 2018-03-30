import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SidebarComponent,
    MenuComponent
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
