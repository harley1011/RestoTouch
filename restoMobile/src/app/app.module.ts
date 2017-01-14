import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {Http} from '@angular/http';
import { TranslateModule,TranslateStaticLoader,TranslateLoader } from 'ng2-translate/ng2-translate';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { WelcomePage } from '../pages/welcome/welcome';
import { SettingsPage } from '../pages/settings/settings';
import { LanguageService } from '../pages/services/language.service';
import { AuthService } from '../pages/services/auth.service';
import { RestaurantService } from '../pages/services/restaurant.service';
import { ApiEndpointService } from '../pages/services/api-endpoint.service';
import { AuthHttpService } from '../pages/services/auth-http.services';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/languages', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    WelcomePage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    WelcomePage,
    SettingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, LanguageService, AuthService, ApiEndpointService, RestaurantService, AuthHttpService]
})
export class AppModule {}
