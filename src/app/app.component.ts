import { Component, OnInit } from '@angular/core';

import { AppLoaderService } from './core/app-loader/app-loader.service';
import { SidebarMenuStateService } from './core/sidebar-menu-state/sidebar-menu-state.service';

@Component({
  selector: 'psa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAppReady = false;
  isCollapsed: boolean;

  constructor(private appLoaderService: AppLoaderService,
              private sidebarMenuStateService: SidebarMenuStateService,) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.appLoaderService.bootstrap();
      this.isAppReady = true;
    }, 550);

    this.sidebarMenuStateService.isCollapsed()
      .subscribe(val => this.isCollapsed = val);
  }
}
