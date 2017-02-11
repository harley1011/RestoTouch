import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { MenuListPage } from '../pages/menu-list/menu-list';
import { MenuPage } from "../pages/menu/menu";
import { IngredientGroupPage } from "../pages/ingredient-group/ingredient-group";
import { LoginPage } from '../pages/login/login';
import { RestaurantListPage } from '../pages/restaurant-list/restaurant-list';
import { AuthService } from '../pages/services/auth.service';
import { RestaurantService } from '../pages/services/restaurant.service';
import { ItemService } from '../pages/services/item.service';
import { MenuService } from '../pages/services/menu.service';
import { CategoryService } from '../pages/services/category.service';
import { ApiEndpointService } from '../pages/services/api-endpoint.service';
import { AuthHttpService } from '../pages/services/auth-http.services';
import {TranslateModule, TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';
import { Http } from '@angular/http';
import { WelcomePage } from '../pages/welcome/welcome';
import { SettingsPage } from '../pages/settings/settings';
import { LanguageService } from '../pages/services/language.service';
import { OrderService } from '../pages/services/order.service';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/languages', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    MenuListPage,
    MenuPage,
    IngredientGroupPage,
    WelcomePage,
    SettingsPage,
    LoginPage,
    RestaurantListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
      TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/languages', '.json'),
            deps: [Http]
        })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    MenuListPage,
    MenuPage,
    IngredientGroupPage,
    WelcomePage,
    SettingsPage,
    LoginPage,
    RestaurantListPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},LanguageService, OrderService, AuthService, ApiEndpointService, RestaurantService, ItemService, MenuService, CategoryService , AuthHttpService, TranslateService]
})
export class AppModule {}
