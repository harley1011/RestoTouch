import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {AuthService} from '../../services/auth.service';

@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
	isActive = false;
	showMenu: string = '';
	isEmployee: boolean;

    constructor(private translate: TranslateService,
    			private authService: AuthService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        }

	eventCalled() {
		this.isActive = !this.isActive;
	}

	ngOnInit() {
    	this.isEmployee = this.authService.loggedInUser.isEmployee;
  	}
	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}
}
