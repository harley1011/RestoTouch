import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { MenuListPage } from '../pages/menu-list/menu-list';
import {MenuPage} from "../pages/menu/menu";
import { LoginPage } from '../pages/login/login';
import { RestaurantListPage } from '../pages/restaurant-list/restaurant-list';
import { AuthService } from '../pages/services/auth.service';
import { RestaurantService } from '../pages/services/restaurant.service';
import { ApiEndpointService } from '../pages/services/api-endpoint.service';
import { AuthHttpService } from '../pages/services/auth-http.services';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    MenuListPage,
    MenuPage,
    LoginPage,
    RestaurantListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    MenuListPage,
    MenuPage,
    LoginPage,
    RestaurantListPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, ApiEndpointService, RestaurantService, AuthHttpService]
})
export class AppModule {}
