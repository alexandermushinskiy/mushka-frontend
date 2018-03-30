import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders/orders/orders.component';
import { SuppliersComponent } from './suppliers/suppliers/suppliers.component';
import { GoodsComponent } from './goods/goods/goods.component';
import { PackagesComponent } from './packages/packages/packages.component';
import { PartnersComponent } from './partners/partners/partners.component';
import { LogisticsComponent } from './logistics/logistics/logistics.component';

const routes: Routes = [
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  { path: 'orders', component: OrdersComponent, pathMatch: 'full' },
  { path: 'suppliers', component: SuppliersComponent, pathMatch: 'full' },
  { path: 'goods', component: GoodsComponent, pathMatch: 'full' },
  { path: 'packages', component: PackagesComponent, pathMatch: 'full' },
  { path: 'logistics', component: LogisticsComponent, pathMatch: 'full' },
  { path: 'partners', component: PartnersComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}