import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Restaurant, RestaurantTranslations} from '../../shared/models/restaurant';
import {RestaurantService} from './restaurant.service';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';

import {Menu} from '../../shared/models/menu';
import {Payment} from '../../shared/models/payment';
import {BusinessHour} from '../../shared/models/business-hour';
import {TranslateService} from 'ng2-translate';

@Component({
  moduleId: module.id,
  selector: 'restaurant-cmp',
  templateUrl: 'restaurant.component.html',
  providers: [RestaurantService]
})

export class RestaurantComponent implements OnInit {
  create: boolean;
  restaurant: Restaurant;
  errorMessage: string;
  hideManageLanguage = false;
  supportedLanguages: Array<Language> = [];
  languages: Array<Language>;
  selectedLanguage: string;
  editingLanguage: Language = new Language('', '', '', 0);
  timeConflicts: Array<boolean> = [false, false, false, false, false, false, false];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private languageService: LanguageService,
              private restaurantService: RestaurantService,
              private translate: TranslateService,) {

    this.languages = languageService.languages();
    languageService.setSupportedLanguages(this.supportedLanguages);

    languageService.selectedLanguageAnnounced$.subscribe(editingLanguage => {
    console.log('changing');
      this.editingLanguage = editingLanguage;
      this.selectedLanguage = editingLanguage.languageCode;
      this.restaurant.selectedTranslation = this.restaurant.translations.find(translation =>
//      translation.languageCode === this.editingLanguage.languageCode);
      translation.languageCode === this.editingLanguage.languageCode);

      if (!this.restaurant.selectedTranslation) {
        this.restaurant.selectedTranslation = new RestaurantTranslations('', '', editingLanguage.languageCode);
        this.restaurant.translations.push(this.restaurant.selectedTranslation);
      }

      // this language of website will be used as a fallback when a translation of website isn't found in the current language
      translate.setDefaultLang('en');
      this.selectedLanguage = 'en';

  });

    this.supportedLanguages.push(this.languages.find(language => language.languageCode === 'en'));
    let translation = new RestaurantTranslations('', '', this.supportedLanguages[0].languageCode);

    let businessHours = [
      new BusinessHour(0, 0, '9:00', '21:00', false),
      new BusinessHour(0, 1, '9:00', '21:00', false),
      new BusinessHour(1, 0, '9:00', '21:00', false),
      new BusinessHour(1, 1, '9:00', '21:00', false),
      new BusinessHour(2, 0, '9:00', '21:00', false),
      new BusinessHour(2, 1, '9:00', '21:00', false),
      new BusinessHour(3, 0, '9:00', '21:00', false),
      new BusinessHour(3, 1, '9:00', '21:00', false),
      new BusinessHour(4, 0, '9:00', '21:00', false),
      new BusinessHour(4, 1, '9:00', '21:00', false),
      new BusinessHour(5, 0, '9:00', '21:00', false),
      new BusinessHour(5, 1, '9:00', '21:00', false),
      new BusinessHour(6, 0, '9:00', '21:00', false),
      new BusinessHour(6, 1, '9:00', '21:00', false)
    ];

    let payments = [
      new Payment('Cash', false),
      new Payment('Debit', false),
      new Payment('Credit', false)
    ];

    this.restaurant = new Restaurant('',
      this.supportedLanguages,
      [translation],
      translation, [],
      payments,
      businessHours
    );

    // Add english by default because the restaurant needs to support at least one language
    this.create = true;
    this.languageService.announceSupportedLanguages(this.supportedLanguages);
  }

  addLanguage() {
    let language = this.supportedLanguages.find(language => language.languageCode === this.selectedLanguage);
    if (language) {
      //todo: remove this once the supported languages are removed from the languages
      console.log('Language is already supported');
      return;
    }
    language = this.languages.find(language => language.languageCode === this.selectedLanguage);
    this.supportedLanguages.push(language);
    let newTranslation = new RestaurantTranslations('', '', language.languageCode);
    this.restaurant.translations.push(newTranslation);
  }

  removeLanguage(language: Language) {
    if (this.supportedLanguages.length <= 1) {
      //todo: error message
      console.log('At least one supported language is required');
    }
    let i = this.supportedLanguages.indexOf(language);
    this.supportedLanguages.splice(i, 1);
    let removedTranslation = this.restaurant.translations.find(translation =>
    translation.languageCode === language.languageCode);
    let j = this.restaurant.translations.indexOf(removedTranslation);
    this.restaurant.translations.splice(j, 1);
  }

  toggleShowManageLanguage(): void {
    this.hideManageLanguage = !this.hideManageLanguage;
  }

  getRestaurant(id: number): void {
    this.restaurantService.getRestaurant(id).subscribe(
      restaurant => {
        this.restaurant = restaurant;
        this.supportedLanguages = restaurant.supportedLanguages;
        this.restaurant.selectedTranslation = this.restaurant.translations[0];
        this.editingLanguage = this.languages.find(language =>
        language.languageCode === this.restaurant.selectedTranslation.languageCode);
        this.languageService.announceSelectedLanguage(this.editingLanguage);
        this.languageService.announceSupportedLanguages(this.supportedLanguages);

        //make sure that business hours are in order of day
        this.restaurant.businessHours.sort((a, b): number => {
          if (a.day < b.day) {
            return -1;
          } else if (a.day === b.day) {
            if (a.shift < b.shift) {
              return -1;
            } else {
              return 1;
            }
          } else {
            return 1;
          }
        });
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  addRemoveMenu(): void {
    this.router.navigate(['/dashboard/menus', this.restaurant.id]);
  }

  openMenu(menu: Menu): void {
    this.router.navigate(['/dashboard/menu', menu.id]);
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.getRestaurant(params['id']);
        this.create = false;
      }
    });
  }

  selectLanguage(language: string) {
      language = language.substr(3, 2);
      console.log(language);
  	this.editingLanguage = new Language(language, 'French', '', 0);
//  	this.editingLanguage = language;
  	this.languageService.announceSelectedLanguage(this.editingLanguage);
  }

  addAndUpdate(): void {
    if (this.hasTimeConflict()) return;

    if (this.create) {
      this.add();
    } else {
      this.update();
    }
  }

  add(): void {
    this.restaurantService.addRestaurant(this.restaurant)
      .subscribe(
        generalResponse => {
          this.router.navigate(['/dashboard/restaurants']);
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  update(): void {
    console.log(this.restaurant);
    this.restaurantService.updateRestaurant(this.restaurant)
      .subscribe(
        generalResponse => {
          this.router.navigate(['/dashboard/restaurants']);
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  delete(): void {
    this.restaurantService.deleteRestaurant(this.restaurant).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/restaurants']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/dashboard/restaurants']);
  }

  hasTimeConflict(): boolean {
    var re = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

    var timeConflict = false;
    var businessHour: BusinessHour;
    var hourMatch1: Array<string>;
    var hourMatch2: Array<string>;
    var time1: number;
    var time2: number;
    for (var i = 0; i < 14; i+=2) {
      businessHour = this.restaurant.businessHours[i];

      hourMatch1 = re.exec(businessHour.openTime);
      hourMatch2 = re.exec(businessHour.closeTime);

      if (hourMatch1 === null || hourMatch2 === null) {
        timeConflict = true;
        this.timeConflicts[i] = true;
        continue;
      }

      time1 = parseInt(hourMatch1[1]) * 60 + parseInt(hourMatch1[2]);
      time2 = parseInt(hourMatch2[1]) * 60 + parseInt(hourMatch2[2]);

      if (time1 >= time2) {
        timeConflict = true;
        this.timeConflicts[i] = true;
        continue;
      }

      businessHour = this.restaurant.businessHours[i+1];
      if (!businessHour.active) {
        this.timeConflicts[i] = false;
        continue;
      }

      hourMatch1 = re.exec(businessHour.openTime);
      hourMatch2 = re.exec(businessHour.closeTime);
      if (hourMatch1 === null || hourMatch2 === null) {
        timeConflict = true;
        this.timeConflicts[i] = true;
        continue;
      }

      time1 = parseInt(hourMatch1[1]) * 60 + parseInt(hourMatch1[2]);

      if (time2 > time1) {
        timeConflict = true;
        this.timeConflicts[i] = true;
        continue;
      }

      time2 = parseInt(hourMatch2[1]) * 60 + parseInt(hourMatch2[2]);

      if (time1 >= time2) {
        timeConflict = true;
        this.timeConflicts[i] = true;
        continue;
      }

      this.timeConflicts[i] = false;
    }

    return timeConflict;
  }
}
