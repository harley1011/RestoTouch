import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Restaurant, RestaurantTranslations} from '../../shared/models/restaurant';
import {RestaurantService} from './restaurant.service';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';

import {Menu} from '../../shared/models/menu';

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

  constructor(private route: ActivatedRoute, private router: Router, private languageService: LanguageService,
              private restaurantService: RestaurantService) {
    this.languages = languageService.languages();
    //todo: remove the supported languages in languages array
    languageService.setSupportedLanguages(this.supportedLanguages);
    languageService.selectedLanguageAnnounced$.subscribe(editingLanguage => {
      this.editingLanguage = editingLanguage;
      this.restaurant.selectedTranslation = this.restaurant.translations.find(translation =>
      translation.languageCode === this.editingLanguage.languageCode);
      // Translations doesn't exist yet for this language
      if (!this.restaurant.selectedTranslation) {
        this.restaurant.selectedTranslation = new RestaurantTranslations('', '', editingLanguage.languageCode);
        this.restaurant.translations.push(this.restaurant.selectedTranslation);
      }
    });

    this.supportedLanguages.push(this.languages.find(language => language.languageCode === 'en'));
    let translation = new RestaurantTranslations('', '', this.supportedLanguages[0].languageCode);
    this.restaurant = new Restaurant('',
      '9:00', '21:00',
      '9:00', '21:00',
      '9:00', '21:00',
      '9:00', '21:00',
      '9:00', '21:00',
      '9:00', '21:00',
      '9:00', '21:00',
      this.supportedLanguages,
      [translation],
      translation, []
    );
    // Add english by default because the restaurant needs to support at least one language
    this.create = true;
    this.languageService.announceSupportedLanguages(this.supportedLanguages);
    //this.languageService.announceSelectedLanguage(this.supportedLanguages[0]);
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
    this.router.navigate(['/dashboard/menu', menu.name]);
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.getRestaurant(params['id']);
        this.create = false;
      }
    });
  }

  addAndUpdate(): void {
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
}
