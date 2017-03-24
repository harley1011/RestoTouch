import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Restaurant, RestaurantTranslations} from '../../shared/models/restaurant';
import {RestaurantService} from '../../services/restaurant.service';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';

import {Menu} from '../../shared/models/menu';
import {Payment} from '../../shared/models/payment';
import {BusinessHour} from '../../shared/models/business-hour';
import {TranslateService} from 'ng2-translate';
import {KitchenStation, KitchenTranslations} from '../../shared/models/kitchen-station';
import {Item} from '../../shared/models/items';
import {CategoryService} from '../category/category.service';
import {Category} from '../../shared/models/category';
import {MenuService} from '../menu/menu.service';


@Component({
  moduleId: module.id,
  selector: 'restaurant-cmp',
  templateUrl: 'restaurant.component.html',
  providers: [CategoryService, MenuService]
})

export class RestaurantComponent implements OnInit {
  create: boolean;
  restaurant: Restaurant;
  errorMessage: string;
  hideManageLanguage = false;

  languages: Array<Language>;
  selectedLanguage: string;
  timeConflicts: Array<boolean> = [false, false, false, false, false, false, false];
  kitchenMode = true; // since the default for kitchen mode is alredy set to 'kce'
  numOfKitchenStation = 0;
  selectedKitchenStation:[KitchenStation, number] = [null, null];
  categories: Array<Category> = [];
  menu: Array<Menu> = [];

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private languageService: LanguageService,
              private restaurantService: RestaurantService,
              private translate: TranslateService,
              private categoryService: CategoryService,
              private menuService: MenuService
              ) {

    this.create = true;
    translate.setDefaultLang('en');
  }

  addLanguage() {
    let language = this.restaurant.supportedLanguages.find(language => language.languageCode === this.selectedLanguage);
    if (language) {
      return;
    }
    language = this.languages.find(language => language.languageCode === this.selectedLanguage);
    this.restaurant.supportedLanguages.push(language);
  }

  onSelectLanguage(language: Language) {
    let restaurantTranslation = this.restaurant.translations.find(translation =>
    translation.languageCode === language.languageCode);
    if (!restaurantTranslation) {
      restaurantTranslation = new RestaurantTranslations('', '', language.languageCode);
      this.restaurant.translations.push(restaurantTranslation);
    }
    this.restaurant.selectedTranslation = restaurantTranslation;

    // also do the kitchen station translation
    this.restaurant.kitchenStations.forEach(station => {
      let kitchenTranslation = station.translations.find(translation => translation.languageCode === language.languageCode);
      if (!kitchenTranslation){
        kitchenTranslation = new KitchenTranslations(language.languageCode, '');
        station.translations.push(kitchenTranslation);
      }
      station.selectedTranslation = kitchenTranslation;
    });
  }

  removeLanguage(language: Language) {
    if (this.restaurant.supportedLanguages.length <= 1) {
      //todo: error message
      console.log('At least one supported language is required');
    }
    let i = this.restaurant.supportedLanguages.indexOf(language);
    this.restaurant.supportedLanguages.splice(i, 1);
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
        // get full menu info
        console.warn(this.restaurant);
        this.menu = [];
        if (this.restaurant.Menus.length !== 0) {
            this.restaurant.Menus.forEach(menu => {
            this.getMenu(menu.id);
          });
        }
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
    let result = this.restaurant.supportedLanguages.indexOf(this.restaurant.supportedLanguages.find(languageToRemove => languageToRemove.languageCode === language.languageCode))? true : false;
    return result;
  }

  removeRestaurantsSupportedLanguagesFromLanguage(): void {
    this.restaurant.supportedLanguages.forEach(language => {
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
        let translation = new RestaurantTranslations('', '', this.languages.find(language => language.languageCode === 'en').languageCode);

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

        let kitchenTranslation = new KitchenTranslations(this.languages.find(language => language.languageCode === 'en').languageCode, '1');
        let newStation = new KitchenStation([kitchenTranslation], kitchenTranslation, []);
        this.selectedKitchenStation[0] = newStation;

        this.restaurant = new Restaurant('',
          [this.languages.find(language => language.languageCode === 'en')],
          [translation],
          translation, [],
          payments,
          businessHours,
          '', 'kce',
          [newStation], // kitchenStation info with default of 1 station as type is 'kce'
          'na' // default value for kitchen/cashier mode and default value for order notification value
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

  activateKitchenMode(s: string): void {
    console.log(this.restaurant);
    if (s === 'cnk') {
     this.kitchenMode = false;
     this.resetToOneDefaultKitchenStationArray();
    } else {
      this.kitchenMode = true;
      this.resetToOneDefaultKitchenStationArray();
    }
  }

  resetToOneDefaultKitchenStationArray():void {
      this.restaurant.kitchenStations.splice(0, this.restaurant.kitchenStations.length);
      let translation = new KitchenTranslations(this.restaurant.selectedTranslation.languageCode, '1');
      let newStation = new KitchenStation([translation], translation, []);
      this.restaurant.kitchenStations.push(newStation);
      this.selectedKitchenStation = [this.restaurant.kitchenStations[0], 0];
  }

  // setNumOfKitStation(n: number): void{
  //   let translation: any;
  //   this.numOfKitchenStation = n;
  //   this.restaurant.kitchenStations = new Array(n);
  //   for(let i =0; i<n;i++){
  //     translation = new KitchenTranslations(this.restaurant.selectedTranslation.languageCode, (i+1).toString());
  //     this.restaurant.kitchenStations[i] = new KitchenStation([translation], translation, []);
  //   }
  //   console.warn(this.restaurant);
  // }

  setKitchenStationName(s: HTMLInputElement, i: number): void{
    this.restaurant.kitchenStations[i].selectedTranslation.name=s.value;
    s.value = null;
   // this.selectedKitchenStation[0].selectedTranslation.name = '';
    console.warn(this.restaurant.kitchenStations[i].selectedTranslation.name);
  }

  kitStatSelected(i: number): void {
    this.selectedKitchenStation = [this.restaurant.kitchenStations[i], i];
  }

  addNewStation(): void {
    let size = this.restaurant.kitchenStations.length;
    let translation = new KitchenTranslations(this.restaurant.selectedTranslation.languageCode, (size+1).toString());
    let newStation = new KitchenStation([translation], translation, []);
    this.restaurant.kitchenStations.push(newStation);
  }

  removeStation(i: number): void {
    this.restaurant.kitchenStations.splice(i,1);
    if(this.restaurant.kitchenStations.length === 0) {
      this.resetToOneDefaultKitchenStationArray();
    }
    //this.selectedKitchenStation[0].selectedTranslation.name ='';
  }

  addItemToKitchenStation(item: Item): void {
    let index =this.selectedKitchenStation[1];
     console.warn(this.restaurant);
    //this.selectedKitchenStation[0].kitItem.push(item);
    this.restaurant.kitchenStations[index].kitItem.push(item);
    this.categories.forEach(cat => {
      cat.items.splice(cat.items.indexOf(item),1);
    });
    console.warn(this.selectedKitchenStation[0]);

    console.warn(this.restaurant.kitchenStations[index]);
  }
  // /*
  //  * get category from db
  //  */
  // getCategories(): void {
  //   this.categoryService.getCategories().subscribe(
  //     categories => {
  //       this.categories = categories;
  //       //console.warn(this.categories);
  //       categories.forEach(category => {
  //         category.selectedTranslation = category.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  getMenu(id: number): void {
    this.menuService.getMenu(id).subscribe(
      menu => {
        this.onSelectLanguage(this.translationSelectComponent.selectedLanguage);
        //this.getCategories();
        this.menu.push(menu);
        menu.categories.forEach( cat => {
          this.categories.push(cat);
        });
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

}
