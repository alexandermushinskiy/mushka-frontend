import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderBadgeComponent } from './header-badge/header-badge.component';
// import { JumpToCsrComponent } from './jump-to-csr/jump-to-csr.component';
import { UserNotificationComponent } from './user-notification/user-notification.component';
import { UserComponent } from '../header/user/user.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    //JumpToCsrComponent,
    HeaderBadgeComponent,
    UserNotificationComponent,
    UserComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
