import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MenuItems } from '../shared/constants/menu-items.const';
import { UnsubscriberComponent } from '../../shared/hooks/unsubscriber.component';
import { MenuLabels } from '../shared/enums/menu-labels.enum';
import { BadgesService } from '../../core/api/badges.service';
import { SidebarMenuStateService } from '../../core/sidebar-menu-state/sidebar-menu-state.service';

@Component({
  selector: 'psa-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent extends UnsubscriberComponent implements OnInit {
  menuItems = MenuItems;

  constructor(private badgesService: BadgesService,
              private sidebarMenuStateService: SidebarMenuStateService,
              private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.getWorklistUnseenTicketsTotal();

    // this.readReceiptService.getTotalUnreadTicketsForFavoriteWorkgroups();
    // this.readReceiptService.onGotFavUnreadTickets()
    //   .takeUntil(this.ngUnsubscribe$)
    //   .subscribe(res => {
    //     this.updateBadge(MenuLabels.FAVORITES, res);
    //   });

    // this.readReceiptService.onTicketRead()
    //   .takeUntil(this.ngUnsubscribe$)
    //   .subscribe((isWorklist: boolean) => {
    //     if (!isWorklist) {
    //       this.updateBadge(MenuLabels.FAVORITES, this.getMenuItem(MenuLabels.FAVORITES).badges - 1);
    //     }
    //   });
  }

  onMenuItemSelected(name) {
    // if ([MenuLabels.VIEWS, MenuLabels.FAVORITES].includes(name)) {
    //   this.sidebarMenuStateService.changeMenuItemCollapsedState();
    // }
  }

  private getWorklistUnseenTicketsTotal() {
    this.badgesService.getUnseenTicketsTotal()
      .takeUntil(this.ngUnsubscribe$)
      .subscribe((unseenTicketsCount: number) => {
        //this.updateBadge(MenuLabels.WORKLIST, unseenTicketsCount);
      });
  }

  private updateBadge(menuItem: MenuLabels, count: number = 0) {
    this.getMenuItem(menuItem).badges = count;
    this.updateMenu();
  }

  private updateMenu() {
    this.menuItems = [...this.menuItems];
    this.cd.markForCheck();
  }

  private getMenuItem(title: string) {
    return this.menuItems.find(item => item.title === title);
  }
}
