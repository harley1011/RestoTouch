"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var restaurant_list_module_1 = require('./restaurant-list/restaurant-list.module');
var restaurant_module_1 = require('./restaurant/restaurant.module');
var category_list_module_1 = require('./category-list/category-list.module');
var category_module_1 = require('./category/category.module');
var menu_list_module_1 = require('./menu-list/menu-list.module');
var menu_module_1 = require('./menu/menu.module');
var item_list_module_1 = require('./item-list/item-list.module');
var item_module_1 = require('./item/item.module');
var home_module_1 = require('./home/home.module');
var dashboard_component_1 = require('./dashboard.component');
var index_1 = require('../shared/index');
var index_2 = require('../shared/index');
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                ng2_bootstrap_1.DropdownModule,
                restaurant_list_module_1.RestaurantListModule,
                restaurant_module_1.RestaurantModule,
                category_list_module_1.CategoryListModule,
                category_module_1.CategoryModule,
                menu_list_module_1.MenuListModule,
                menu_module_1.MenuModule,
                home_module_1.HomeModule,
                item_list_module_1.ItemListModule,
                item_module_1.ItemModule
            ],
            declarations: [dashboard_component_1.DashboardComponent, index_1.TopNavComponent, index_2.SidebarComponent],
            exports: [dashboard_component_1.DashboardComponent, index_1.TopNavComponent, index_2.SidebarComponent]
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
