import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {CategoryRoutes} from './category/category.routes';
import {CategoryListRoutes} from './category-list/category-list.routes';
import {ComboListRoutes} from './combo-list/combo-list.routes';
import {ComboRoutes} from './combo/combo.routes';
import {RestaurantRoutes} from './restaurant/restaurant.routes';
import {RestaurantsRoutes} from './restaurant-list/restaurant-list.routes';

import {HomeRoutes} from './home/home.routes';

import {ItemRoutes} from './item/item.routes';
import {ItemListRoutes} from './item-list/item-list.routes';

import {MenuRoutes} from './menu/menu.routes';
import {MenuListRoutes} from './menu-list/menu-list.routes';

import {SettingsRoutes} from './settings/account-settings.routes';

import {ProfileRoutes} from './profile/profile.routes';

import {UnpaidOrdersRoutes} from './unpaid-orders/unpaid-orders.routes';
import {OrdersRoutes} from './order-list/order-list.routes';
import {OrderRoutes} from './order/order.routes';

import { NgModule } from '@angular/core';
import {AuthService} from '../services/auth.service';
const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: HomeRoutes.concat(CategoryRoutes)
      .concat(CategoryListRoutes)
      .concat(ComboListRoutes)
      .concat(RestaurantRoutes)
      .concat(ComboRoutes)
      .concat(RestaurantsRoutes)
      .concat(ItemRoutes)
      .concat(ItemListRoutes)
      .concat(MenuRoutes)
      .concat(MenuListRoutes)
      .concat(SettingsRoutes)
      .concat(ProfileRoutes)
      .concat(UnpaidOrdersRoutes)
      .concat(OrdersRoutes)
      .concat(OrderRoutes),
    canActivate: [AuthService],
    canActivateChild: [AuthService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
