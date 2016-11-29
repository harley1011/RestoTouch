"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var user_1 = require('../shared/models/user');
/**
*	This class represents the lazy loaded SignupComponent.
*/
var SignupComponent = (function () {
    function SignupComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.user = new user_1.User('', '', '', '', '');
        this.errorMessage = '';
    }
    SignupComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.user.password !== this.user.passwordConfirm) {
            this.errorMessage = 'Passwords do not match';
            return;
        }
        this.authService.registerUser(this.user)
            .subscribe(function (loginResponse) {
            console.log(loginResponse);
            _this.router.navigate(['/dashboard/restaurants']);
        }, function (error) { return _this.errorMessage = error; });
    };
    SignupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'signup-cmp',
            templateUrl: 'signup.component.html'
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
