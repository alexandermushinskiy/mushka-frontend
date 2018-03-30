export class MenuItem {
  title: string;
  icon: string;
  routePath: string;
  isEnabled: boolean;
  badges = 0;
  queryParams?: object;
  isExternal?: boolean;
  link?: string;

  constructor(menuItem) {
    Object.assign(this, menuItem);
    if (menuItem.badges > 0) {
      this.badges = menuItem.badges;
    }
  }
}
