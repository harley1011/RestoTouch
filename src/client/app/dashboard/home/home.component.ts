import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/models/user';
import {TranslateService} from 'ng2-translate';

//import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: [HomeService]
})

export class HomeComponent implements OnInit {
    user: User;

    constructor(private authService: AuthService,
                private translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
                }

    ngOnInit() {
        this.user = this.authService.loggedInUser;
    }
}
