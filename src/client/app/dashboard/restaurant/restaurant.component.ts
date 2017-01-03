import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Restaurant, RestaurantTranslations} from '../../shared/models/restaurant';
import {RestaurantService} from './restaurant.service';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';

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
  timeConflicts: Array<boolean> = [false, false, false, false, false, false, false];

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private languageService: LanguageService,
              private restaurantService: RestaurantService,
              private translate: TranslateService,) {


    translate.setDefaultLang('en');
  }

  addLanguage() {
    let language = this.supportedLanguages.find(language => language.languageCode === this.selectedLanguage);
    if (language) {
      return;
    }
    language = this.languages.find(language => language.languageCode === this.selectedLanguage);
    this.supportedLanguages.push(language);
  }

  onSelectLanguage(language: Language) {
    let restaurantTranslation = this.restaurant.translations.find(translation =>
    translation.languageCode === language.languageCode);
    if (!restaurantTranslation) {
      restaurantTranslation = new RestaurantTranslations('', '', language.languageCode);
      this.restaurant.translations.push(restaurantTranslation);
    }
    this.restaurant.selectedTranslation = restaurantTranslation;
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
        // this.supportedLanguages.forEach(language => {
        //   this.languages.splice(this.languages.indexOf(this.languages.find(languageToRemove => languageToRemove.languageCode === language.languageCode)), 1);
        // });
        this.onSelectLanguage(this.translationSelectComponent.selectedLanguage);
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

  checkIfInSupportedLanguages(language: Language): boolean {
    return this.languages.indexOf(this.languages.find(languageToRemove => languageToRemove.languageCode === language.languageCode))? true : false;
  }

  removeRestaurantsSupportedLanguagesFromLanguage(): void {
    this.supportedLanguages.forEach(language => {
        this.languages.splice(this.languages.indexOf(this.languages.find(languageToRemove => languageToRemove.languageCode === language.languageCode)), 1);
      });
  }

  ngOnInit(): void {
    this.languageService.getSupportedLanguages().subscribe((languages: Array<Language>) => {
      this.languages = languages;

      this.route.params.forEach((params: Params) => {
        if (params['id']) {
          this.getRestaurant(params['id']);
          this.create = false;
        }
      });

      if (this.create) {
        this.supportedLanguages.push(this.languages.find(language => language.languageCode === 'en'));
        //this.removeRestaurantsSupportedLanguagesFromLanguage();
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
      }
    });
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
    for (var i = 0; i < 14; i += 2) {
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

      businessHour = this.restaurant.businessHours[i + 1];
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
