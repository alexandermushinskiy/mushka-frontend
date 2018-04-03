import { Component } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';

import { SidebarMenuStateService } from '../../core/sidebar-menu-state/sidebar-menu-state.service';

@Component({
  selector: 'psa-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @LocalStorage('collapsed_sidebar_mode', false) isCollapsed;

  constructor(private sidebarMenuStateService: SidebarMenuStateService) {
    this.sidebarMenuStateService.setCollapsedState(this.isCollapsed);
  }

  toggleCollapseMode() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarMenuStateService.setCollapsedState(this.isCollapsed);
  }
}
