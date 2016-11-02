import {Route} from '@angular/router';

import {RestaurantsRoutes} from './restaurant-list/index';
import {RestaurantRoutes} from './restaurant/index';
import {CategoryRoutes} from './categories/index';
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
