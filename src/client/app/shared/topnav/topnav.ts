import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../models/user';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';

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

  constructor(private authService: AuthService, private languageService: LanguageService) {
    languageService.supportedLanguagesAnnounced$.subscribe(supportedLanguages => {
      this.hideLanguageSelect = supportedLanguages.length === 0;
      this.languages = supportedLanguages;
    });
  }

  ngOnInit() {
    this.user = this.authService.loggedInUser;
  }

  selectLanguage(language: Language) {
  	this.selectedLanguage = language;
  }

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
