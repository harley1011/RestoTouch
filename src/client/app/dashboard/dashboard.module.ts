import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownModule} from 'ng2-bootstrap/ng2-bootstrap';

import {RestaurantListModule} from './restaurant-list/restaurant-list.module';
import {RestaurantModule} from './restaurant/restaurant.module';
import {CategoryListModule} from './category-list/category-list.module';
import {CategoryModule} from './category/category.module';
import {MenuListModule} from './menu-list/menu-list.module';
import {MenuModule} from './menu/menu.module';
import {ItemListModule} from './item-list/item-list.module';
import {ItemModule} from './item/item.module';
import {HomeModule} from './home/home.module';
import {TranslateModule} from 'ng2-translate';

import {DashboardRoutingModule} from './dashboard-routing.module';

import {DashboardComponent} from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';


@NgModule({
    imports: [
        CommonModule,
        DropdownModule,
        RestaurantListModule,
        RestaurantModule,
        CategoryListModule,
        CategoryModule,
        MenuListModule,
        MenuModule,
        HomeModule,
        ItemListModule,
        DashboardRoutingModule,
        ItemModule,
        TranslateModule
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule {
}
