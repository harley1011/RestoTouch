"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var bsComponent_component_1 = require('./bsComponent.component');
var BSComponentModule = (function () {
    function BSComponentModule() {
    }
    BSComponentModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                ng2_bootstrap_1.AlertModule,
                ng2_bootstrap_1.ButtonsModule,
                ng2_bootstrap_1.DropdownModule,
                ng2_bootstrap_1.PaginationModule,
                ng2_bootstrap_1.ProgressbarModule,
                ng2_bootstrap_1.RatingModule,
                ng2_bootstrap_1.TabsModule,
                ng2_bootstrap_1.TooltipModule,
                ng2_bootstrap_1.TypeaheadModule
            ],
            declarations: [bsComponent_component_1.BSComponentComponent],
            exports: [bsComponent_component_1.BSComponentComponent]
        })
    ], BSComponentModule);
    return BSComponentModule;
}());
exports.BSComponentModule = BSComponentModule;
//# sourceMappingURL=bsComponent.module.js.map