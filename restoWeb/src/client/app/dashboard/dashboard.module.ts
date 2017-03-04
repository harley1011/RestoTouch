import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownModule} from 'ng2-bootstrap/dropdown';
import {RestaurantListModule} from './restaurant-list/restaurant-list.module';
import {RestaurantModule} from './restaurant/restaurant.module';
import {CategoryListModule} from './category-list/category-list.module';
import {CategoryModule} from './category/category.module';
import {MenuListModule} from './menu-list/menu-list.module';
import {MenuModule} from './menu/menu.module';
import {ItemListModule} from './item-list/item-list.module';
import {ItemModule} from './item/item.module';
import {HomeModule} from './home/home.module';
import {SettingsModule} from './settings/account-settings.module';
import {TranslateModule} from 'ng2-translate';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {TopNavComponent, SidebarComponent} from '../shared/index';
import { ModalModule } from 'ng2-bootstrap/modal';
import {FormsModule} from '@angular/forms';
import {ProfileModule} from './profile/profile.module';
import {UnpaidOrdersModule} from './unpaid-orders/unpaid-orders.module';
import {OrderListModule} from './order-list/order-list.module';
import {OrderModule} from './order/order.module';
@NgModule({
  imports: [
    CommonModule,
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    RestaurantListModule,
    RestaurantModule,
    CategoryListModule,
    CategoryModule,
    MenuListModule,
    SettingsModule,
    MenuModule,
    HomeModule,
    ItemListModule,
    DashboardRoutingModule,
    ItemModule,
    TranslateModule,
    ProfileModule,
    UnpaidOrdersModule,
    OrderListModule,
    OrderModule
  ],
  declarations: [DashboardComponent, TopNavComponent, SidebarComponent],
  exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule {
}
