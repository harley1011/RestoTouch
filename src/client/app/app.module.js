"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routes_1 = require('./app.routes');
var login_module_1 = require('./login/login.module');
var logout_module_1 = require('./logout/logout.module');
var signup_module_1 = require('./signup/signup.module');
var dashboard_module_1 = require('./dashboard/dashboard.module');
var shared_module_1 = require('./shared/shared.module');
var auth_service_1 = require('./services/auth.service');
var auth_http_services_1 = require('./services/auth-http.services');
var api_endpoint_service_1 = require('./services/api-endpoint.service');
var language_service_1 = require('./services/language.service');
var image_upload_service_1 = require('./services/image-upload.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(app_routes_1.routes),
                login_module_1.LoginModule,
                logout_module_1.LogoutModule,
                signup_module_1.SignupModule,
                dashboard_module_1.DashboardModule,
                shared_module_1.SharedModule.forRoot()
            ],
            declarations: [app_component_1.AppComponent],
            providers: [auth_service_1.AuthService, api_endpoint_service_1.ApiEndpointService, auth_http_services_1.AuthHttpService, language_service_1.LanguageService, image_upload_service_1.ImageUploadService, {
                    provide: common_1.APP_BASE_HREF,
                    useValue: '<%= APP_BASE %>'
                }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
