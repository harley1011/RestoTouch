import {Route} from '@angular/router';

import {RestaurantsRoutes} from './restaurant-list/index';
import {RestaurantRoutes} from './restaurant/index';
import {CategoryListRoutes} from './category-list/index';
import {CategoryRoutes} from './category/index';
import {MenuListRoutes} from './menu-list/index';
import {MenuRoutes} from './menu/index';
import {HomeRoutes} from './home/index';
import {ItemListRoutes} from './item-list/index';
import {ItemRoutes} from './item/index';

import {DashboardComponent} from './index';
import {AuthService} from '../services/auth.service';

export const DashboardRoutes: Route[] = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            ...RestaurantsRoutes,
            ...CategoryListRoutes,
            ...CategoryRoutes,
            ...RestaurantRoutes,
            ...MenuListRoutes,
            ...MenuRoutes,
            ...HomeRoutes,
            ...ItemListRoutes,
            ...ItemRoutes
        ],
        canActivate: [AuthService],
        canActivateChild: [AuthService]
    }
];
