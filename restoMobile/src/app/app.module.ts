import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../pages/services/auth.service';
import { ApiEndpointService } from '../pages/services/api-endpoint.service';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, ApiEndpointService]
})
export class AppModule {}
