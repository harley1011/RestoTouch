import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../models/user';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';
import { Router } from '@angular/router';
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
              private languageService: LanguageService, private router: Router,
              private translate: TranslateService) {
//    languageService.supportedLanguagesAnnounced$.subscribe(supportedLanguages => {
//      this.hideLanguageSelect = supportedLanguages.length === 0;
//      this.languages = supportedLanguages;
//    // this language will be used as a fallback when a translation isn't found in the current language
//    translate.setDefaultLang('en');
//    });
//    languageService.selectedLanguageAnnounced$.subscribe(selectedLanguage => {
//      this.selectedLanguage = selectedLanguage;
//    });
  }

  ngOnInit() {
    this.user = this.authService.loggedInUser;
    this.initLanguages();
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
    
  initLanguages():void {
      this.translate.addLangs(['en', 'fr']);
      this.translate.setDefaultLang('en');
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    }
}
