import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../../../../../restoCommon/shared/models/user';
import {Language} from '../../../../../../restoCommon/shared/models/language';
import {TranslateService} from 'ng2-translate';

@Component({
  moduleId: module.id,
  selector: 'top-nav',
  templateUrl: 'topnav.html'
})

export class TopNavComponent implements OnInit {
  user: User;
  languages: Array<Language> = [];
  hideLanguageSelect = true;
  selectedLanguage: Language = new Language('','','',0);
  errorMessage = '';

  constructor(private authService: AuthService,
              private translate: TranslateService) {
      // this language of website will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.user = this.authService.loggedInUser;
  }

//  selectLanguage(language: Language) {
//  	this.selectedLanguage = language;
//  	this.languageService.announceSelectedLanguage(language);
//  }

  changeTheme(color: string): void {
    var link: any = $('<link>');
    link
      .appendTo('head')
      .attr({type: 'text/css', rel: 'stylesheet'})
      .attr('href', 'themes/app-' + color + '.css');
  }

  rtl(): void {
    var body: any = $('body');
    body.toggleClass('rtl');
  }

  sidebarToggler(): void {
    var sidebar: any = $('#sidebar');
    var mainContainer: any = $('.main-container');
    sidebar.toggleClass('sidebar-left-zero');
    mainContainer.toggleClass('main-container-ml-zero');
  }
}
