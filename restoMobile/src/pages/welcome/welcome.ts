import { Component, EventEmitter, Output } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Language } from '../shared/models/language';
import { LanguageService } from '../services/language.service';
import {TranslateService} from 'ng2-translate';
import { MenuPage } from '../menu/menu';
import { Page2 } from '../page2/page2'
import { Restaurant } from '../shared/models/restaurant';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

	languages: Array<Language> = [];
  supportedLanguages: Array<Language> = [];
	selectedLanguage: Language = new Language('','selectedLanguage','',0);
	selectedRestaurant: any;
	selectedMenu: any;
  openSlider: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
  			      private languageService: LanguageService,
              private translate: TranslateService,
              private restaurantService: RestaurantService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    this.selectedRestaurant = navParams.get('item');
    this.languages = languageService.languages();
    if (this.restaurantService.selectedRestaurant) {
    this.selectedRestaurant = this.restaurantService.selectedRestaurant;
    } else {
        this.selectedRestaurant = navParams.get('restaurant');
    }
    this.selectedMenu = navParams.get('item');
    this.languages = languageService.languages();//TODO the error coming from here (supported http service call, language error: solved by doing languageMock)
    for (let availLang of this.selectedRestaurant.translations){
      let lang = this.languages.find(language => language.languageCode === availLang.languageCode);
      this.supportedLanguages.push(lang);
    }
  }

  continueTapped(event, lang) {
    // Will push to virtual menu page
      this.selectedLanguage = lang;
    this.navCtrl.push(MenuPage, {
      language: this.selectedLanguage,
      menu: this.selectedMenu
    });
  }

  tapEvent(e) {
    this.toggleSliderOpen();
  }

  mySwipeUpAction(){
//    console.log('hello up');
    this.toggleSliderOpen();
  }

  mySwipeDownAction(){
//    console.log('hello down');
    this.toggleSliderOpen();
  }

  selectLanguage() {
    let trans = this.selectedRestaurant.translations.find(translation =>
      translation.languageCode === this.selectedLanguage.languageCode);
    this.selectedRestaurant.selectedTranslation = trans;
    //to set the current language
    this.translate.use(this.selectedLanguage.languageCode);
  }

    // toggle btwn french and english for app language
  switchLanguage(){
    if(this.translate.currentLang === 'en'){
      this.translate.use('fr');
    }
    else
      this.translate.use('en');
  }

  /**
  * toggle the top slider to open or close
  **/
  toggleSliderOpen(){
    this.openSlider = !this.openSlider;
    var d = document.getElementById("slider");
    if(this.openSlider){
      d.className += " show";
    } else {
      d.className ="top";
    }
  }
}
