import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderBadgeComponent } from './header-badge/header-badge.component';
import { UserNotificationComponent } from './user-notification/user-notification.component';
import { UserComponent } from '../header/user/user.component';
import { GlobalSearchComponent } from './global-search/global-search.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    HeaderBadgeComponent,
    UserNotificationComponent,
    UserComponent,
    GlobalSearchComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
