import { MenuItem } from '../models/menu-item.model';
import { MenuLabels } from '../enums/menu-labels.enum';

export const MenuItems: MenuItem[] = [
  new MenuItem({
    title: MenuLabels.ORDERS,
    icon: 'fa-shopping-cart',
    routePath: '/orders',
    isEnabled: true,
    badges: 13
  }),
  new MenuItem({
    title: MenuLabels.PRODUCTS,
    icon: 'fa-shopping-bag',
    routePath: '/products',
    isEnabled: true,
    isExternal: true,
  }),
  new MenuItem({
    title: MenuLabels.SUPPLIERS,
    icon: 'fa-users',
    routePath: '/suppliers',
    isEnabled: true,
  }),
  new MenuItem({
    title: MenuLabels.PARTNERS,
    icon: 'fa-handshake-o',
    routePath: '/partners',
    isEnabled: true
  }),
  new MenuItem({
    title: MenuLabels.LOGISTICS,
    icon: 'fa-truck',
    routePath: '/logistics',
    isEnabled: true,
  }),
  new MenuItem({
    title: MenuLabels.HELP,
    icon: 'ico-help',
    routePath: '/help',
    isEnabled: true,
  })
];
