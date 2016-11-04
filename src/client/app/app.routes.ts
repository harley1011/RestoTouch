import { Routes } from '@angular/router';

import { LoginRoutes } from './login/index';
import { LoginComponent } from './login/index';
import { LogoutRoutes } from './logout/index';
import { SignupRoutes } from './signup/index';
import { DashboardRoutes } from './dashboard/index';


export const routes: Routes = [
	...LoginRoutes,
	...LogoutRoutes,
	...SignupRoutes,
	...DashboardRoutes,
	{ path: '**', component: LoginComponent }
];
