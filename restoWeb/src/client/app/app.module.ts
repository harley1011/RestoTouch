import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { SignupModule } from './signup/signup.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { AuthService} from './services/auth.service';
import { AuthHttpService } from './services/auth-http.services';
import { ApiEndpointService } from './services/api-endpoint.service';
import { ImageUploadService } from './services/image-upload.service';
import {TranslateModule, TranslateLoader,TranslateStaticLoader} from 'ng2-translate';
import { LanguageService } from './services/language.service';
import { OrderService } from './services/order.service';
import { OrderNotifierService } from './services/order-notifier.service';
import {DataTableModule} from "angular2-datatable";
import {DatePipe} from "@angular/common";
@NgModule({
	imports: [
		BrowserModule,
    AppRoutingModule,
		HttpModule,
		LoginModule,
		LogoutModule,
		SignupModule,
		DashboardModule,
    DataTableModule,
		SharedModule.forRoot(),
		TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/languages', '.json'),
            deps: [Http]
        })
	],
	exports: [
		TranslateModule
	],
	declarations: [AppComponent],
	providers: [LanguageService, AuthService, ApiEndpointService, AuthHttpService, ImageUploadService, OrderService, OrderNotifierService, DatePipe, {
	provide: APP_BASE_HREF,
	useValue: '<%= APP_BASE %>'
	}],
	bootstrap: [AppComponent]
})

export class AppModule { }
