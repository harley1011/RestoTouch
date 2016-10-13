import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized, Event as NavigationEvent } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { User} from '../models/user';
import { LanguageService} from '../../services/language.service';
import { Language } from '../../shared/models/language';

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
})

export class TopNavComponent implements OnInit  {
  user: User;
  languages: Array<Language>;
  hideLanguageSelect = true;


  constructor(private authService: AuthService, private languageService: LanguageService,
  			  private route: ActivatedRoute, private router: Router) {
  	router.events.forEach((event: NavigationEvent) => {
  		if(event instanceof RoutesRecognized) {
  			//this.hideLanguageSelect = !this.hideLanguageSelect;
  			this.route.params.forEach((params:Params) => {
  				console.log(params);
	    	if(params['name']) {
	    		this.hideLanguageSelect = false;
		    		//Retrieve supported languages for that resto
    		} else {
    			this.hideLanguageSelect = true;
    		}
    	});
  		}
  	});
  	this.languages = this.languageService.languages();
  }

  ngOnInit() {
    this.user = this.authService.loggedInUser;
  }

	changeTheme(color: string): void {
		var link: any = $('<link>');
		link
			.appendTo('head')
			.attr({type : 'text/css', rel : 'stylesheet'})
			.attr('href', 'themes/app-'+color+'.css');
	}

	rtl(): void {
		var body: any = $('body');
		body.toggleClass('rtl');
	}

	sidebarToggler(): void  {
		var sidebar: any = $('#sidebar');
		var mainContainer: any = $('.main-container');
		sidebar.toggleClass('sidebar-left-zero');
		mainContainer.toggleClass('main-container-ml-zero');
	}
}
