"use strict";
var index_1 = require('./restaurant-list/index');
var index_2 = require('./charts/index');
var index_3 = require('./blank-page/index');
var index_4 = require('./tables/index');
var index_5 = require('./forms/index');
var index_6 = require('./grid/index');
var index_7 = require('./bs-component/index');
var index_8 = require('./bs-element/index');
var index_9 = require('./index');
exports.DashboardRoutes = [
    {
        path: 'dashboard',
        component: index_9.DashboardComponent,
        children: index_1.RestaurantsRoutes.concat(index_2.ChartRoutes, index_7.BSComponentRoutes, index_4.TableRoutes, index_3.BlankPageRoutes, index_5.FormRoutes, index_6.GridRoutes, index_8.BSElementRoutes)
    }
];
//# sourceMappingURL=dashboard.routes.js.map
