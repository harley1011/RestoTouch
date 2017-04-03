import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/models/user';
import {TranslateService} from 'ng2-translate';
import {Router} from '@angular/router';

import {Restaurant} from '../../shared/models/restaurant';
import {Language} from '../../shared/models/language';
import {RestaurantService} from '../../services/restaurant.service';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';

//import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: [HomeService, RestaurantService]
})

export class HomeComponent implements OnInit {
    user: User;
    numOfRestaurants: number;
    restaurants: Restaurant[];
    isEmployee: boolean;
    currentLanguage: String;

    @ViewChild(TranslationSelectComponent)
    private translationSelectComponent: TranslationSelectComponent;

    constructor(private authService: AuthService,
                private translate: TranslateService,
                private restaurantListService: RestaurantService,
              private router: Router) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        this.currentLanguage = translate.currentLang;
                }

    getRestaurants(): void {
    this.restaurantListService.getRestaurants().subscribe(
      restaurants => {
        restaurants.forEach(restaurant => {
          restaurant.selectedTranslation = restaurant.translations.find(translation => translation.languageCode === this.currentLanguage);
        });
        this.restaurants = restaurants;
        this.numOfRestaurants = this.restaurants.length;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelectLanguage(language: Language) {
    this.restaurants.forEach(restaurant => {
      restaurant.selectedTranslation = restaurant.translations.find(translation => translation.languageCode === language.languageCode);
    });
  }

  ngOnInit(): void {
    this.user = this.authService.loggedInUser;
    this.getRestaurants();
  }

  modify(restaurant: Restaurant): void {
      this.router.navigate(['/dashboard/restaurant', restaurant.id]);
  }
}
