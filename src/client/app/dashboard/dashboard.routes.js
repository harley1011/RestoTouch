"use strict";
var index_1 = require('./restaurant-list/index');
var index_2 = require('./restaurant/index');
var index_3 = require('./category-list/index');
var index_4 = require('./category/index');
var index_5 = require('./menu-list/index');
var index_6 = require('./menu/index');
var index_7 = require('./home/index');
var index_8 = require('./item-list/index');
var index_9 = require('./item/index');
var index_10 = require('./index');
var auth_service_1 = require('../services/auth.service');
exports.DashboardRoutes = [
    {
        path: 'dashboard',
        component: index_10.DashboardComponent,
        children: index_1.RestaurantsRoutes.concat(index_3.CategoryListRoutes, index_4.CategoryRoutes, index_2.RestaurantRoutes, index_5.MenuListRoutes, index_6.MenuRoutes, index_7.HomeRoutes, index_8.ItemListRoutes, index_9.ItemRoutes),
        canActivate: [auth_service_1.AuthService],
        canActivateChild: [auth_service_1.AuthService]
    }
];
