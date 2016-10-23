import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';

import { RestaurantListModule } from './restaurant-list/restaurant-list.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { CategoriesModule } from './categories/categories.module';
import { MenuListModule } from './menu-list/menu-list.module';
import { MenuModule } from './menu/menu.module';


import { DashboardComponent } from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';


@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	DropdownModule,
      RestaurantListModule,
      RestaurantModule,
      CategoriesModule,
      MenuListModule,
      MenuModule
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule { }
