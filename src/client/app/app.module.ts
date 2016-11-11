import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { SignupModule } from './signup/signup.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { AuthService} from './services/auth.service';
import { AuthHttpService } from './services/auth-http.services';
import { ApiEndpointService } from './services/api-endpoint.service';
import { LanguageService } from './services/language.service';
import { ImageUploadService } from './services/image-upload.service';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(routes),
		LoginModule,
		LogoutModule,
		SignupModule,
		DashboardModule,
		SharedModule.forRoot()
	],
	declarations: [AppComponent],
	providers: [AuthService, ApiEndpointService, AuthHttpService, LanguageService, ImageUploadService, {
	provide: APP_BASE_HREF,
	useValue: '<%= APP_BASE %>'
	}],
	bootstrap: [AppComponent]

})

export class AppModule { }
