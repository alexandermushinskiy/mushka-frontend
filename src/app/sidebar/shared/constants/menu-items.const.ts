import { MenuItem } from '../models/menu-item.model';
import { MenuLabels } from '../enums/menu-labels.enum';

export const MenuItems: MenuItem[] = [
  new MenuItem({
    title: MenuLabels.SEARCH_CSR,
    icon: 'ico-search',
    routePath: '/search-csr',
    isEnabled: true,
  }),
  new MenuItem({
    title: MenuLabels.DASHBOARD,
    icon: 'ico-dashboard',
    routePath: '/dashboard',
    isEnabled: true,
    isExternal: true,
    link: `/dashboard/new/`,
  }),
  new MenuItem({
    title: MenuLabels.WORKLIST,
    icon: 'ico-worklist',
    routePath: '/worklist',
    isEnabled: true,
    badges: 0,
  }),
  new MenuItem({
    title: MenuLabels.FAVORITES,
    icon: 'ico-favorites',
    routePath: '/favorites',
    isEnabled: true,
  }),
  new MenuItem({
    title: MenuLabels.VIEWS,
    icon: 'ico-views',
    routePath: '/views',
    isEnabled: true
  }),
  new MenuItem({
    title: MenuLabels.WORKGROUPS,
    icon: 'ico-workgroups',
    routePath: '/workgroups',
    isEnabled: true,
  }),
  new MenuItem({
    title: MenuLabels.TEAM,
    icon: 'ico-team',
    routePath: '/team',
    isEnabled: true,
    isExternal: true,
    link: `/team`
  }),
  new MenuItem({
    title: MenuLabels.KANBAN,
    icon: 'ico-kanban',
    routePath: '/kanban',
    isEnabled: true,
    isExternal: true,
    link: `/kanban`,
  }),
  new MenuItem({
    title: MenuLabels.HELP,
    icon: 'ico-help',
    routePath: '/help',
    isEnabled: true,
  })
];
