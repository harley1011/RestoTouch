"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/**
*	This class represents the lazy loaded HomeComponent.
*/
var TimelineComponent = (function () {
    function TimelineComponent() {
    }
    TimelineComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'timeline-cmp',
            templateUrl: 'timeline.html',
            styleUrls: ['timeline.css']
        })
    ], TimelineComponent);
    return TimelineComponent;
}());
exports.TimelineComponent = TimelineComponent;
var ChatComponent = (function () {
    function ChatComponent() {
    }
    ChatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chat-cmp',
            templateUrl: 'chat.html'
        })
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
var NotificationComponent = (function () {
    function NotificationComponent() {
    }
    NotificationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'notifications-cmp',
            templateUrl: 'notifications.html'
        })
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
var HomeComponent = (function () {
    /* END*/
    function HomeComponent() {
        /* Carousel Variable */
        this.myInterval = 5000;
        this.index = 0;
        this.slides = [];
        this.imgUrl = [
            "assets/img/slider1.jpg",
            "assets/img/slider2.jpg",
            "assets/img/slider3.jpg",
            "assets/img/slider0.jpg"
        ];
        /* END */
        /* Alert component */
        this.alerts = [
            {
                type: 'danger',
                msg: 'Oh snap! Change a few things up and try submitting again.'
            },
            {
                type: 'success',
                msg: 'Well done! You successfully read this important alert message.',
                closable: true
            }
        ];
        for (var i = 0; i < 4; i++) {
            this.addSlide();
        }
    }
    HomeComponent.prototype.closeAlert = function (i) {
        this.alerts.splice(i, 1);
    };
    /* Carousel */
    HomeComponent.prototype.addSlide = function () {
        var i = this.slides.length;
        this.slides.push({
            image: this.imgUrl[i],
            text: ['Dummy ', 'Dummy ', 'Dummy ', 'Dummy '][this.slides.length % 4] + "\n      \t\t\t" + ['text 0', 'text 1', 'text 2', 'text 3'][this.slides.length % 4]
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home-cmp',
            templateUrl: 'home.component.html'
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map