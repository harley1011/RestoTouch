import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Restaurant} from '../home/restaurantlist/restaurant';
import {RestaurantService} from './restaurant.service';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';

@Component({
  moduleId: module.id,
  selector: 'restaurant-cmp',
  templateUrl: 'restaurant.component.html',
  styleUrls: ['restaurant.css'],
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
  editingLanguage: Language = new Language('','','',0);

  constructor(private route: ActivatedRoute, private router: Router, private languageService: LanguageService,
              private restaurantService: RestaurantService) {
    this.languages = languageService.languages();
    //todo: remove the supported languages in languages array
    languageService.setSupportedLanguages(this.supportedLanguages);
    languageService.selectedLanguageAnnounced$.subscribe(editingLanguage => {
    	this.editingLanguage = editingLanguage;
    });
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
  }

  removeLanguage(language: Language) {
    if (this.supportedLanguages.length <= 1) {
      //todo: error message
      console.log('At least one supported language is required');
    }
    let i = this.supportedLanguages.indexOf(language);
    this.supportedLanguages.splice(i, 1);
  }

  toggleShowManageLanguage(): void {
    this.hideManageLanguage = !this.hideManageLanguage;
  }

  getRestaurant(name: string): void {
    this.restaurantService.getRestaurant(name).subscribe(
      restaurant => {
        this.restaurant = restaurant;
        this.supportedLanguages = restaurant.supportedLanguages;
        this.languageService.announceSupportedLanguages(this.supportedLanguages);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['name']) {
        this.getRestaurant(params['name']);
        this.create = false;
      } else {
        this.restaurant = new Restaurant('', '', '',
          '9:00', '21:00',
          '9:00', '21:00',
          '9:00', '21:00',
          '9:00', '21:00',
          '9:00', '21:00',
          '9:00', '21:00',
          '9:00', '21:00',
          this.supportedLanguages,
          this.editingLanguage);
        // Add english by default because the restaurant needs to support at least one language
        this.supportedLanguages.push(this.languages.find(language => language.languageCode === 'en'));
        this.create = true;
      }
    });
  }

  addAndUpdate(): void {
    var values = validateInputs();
    if (values === null) return;

    var oldName = this.restaurant.name;
    this.restaurant.name = values['name'];
    this.restaurant.description = values['description'];
    this.restaurant.address = values['address'];
    this.restaurant.mOpen = values['mOpen'];
    this.restaurant.mClose = values['mClose'];
    this.restaurant.tuOpen = values['tuOpen'];
    this.restaurant.tuClose = values['tuClose'];
    this.restaurant.wOpen = values['wOpen'];
    this.restaurant.wClose = values['wClose'];
    this.restaurant.thOpen = values['thOpen'];
    this.restaurant.thClose = values['thClose'];
    this.restaurant.fOpen = values['fOpen'];
    this.restaurant.fClose = values['fClose'];
    this.restaurant.saOpen = values['saOpen'];
    this.restaurant.saClose = values['saClose'];
    this.restaurant.suOpen = values['suOpen'];
    this.restaurant.suClose = values['suClose'];
    this.restaurant.selectedLanguage = this.editingLanguage;

    if (this.create) {
      this.add();
    } else {
      this.update(oldName);
    }
  }

  add(): void {
    this.restaurantService.addRestaurant(this.restaurant)
      .subscribe(
        generalResponse => {
          this.router.navigate(['/dashboard/home']);
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  update(oldName: string): void {
    this.restaurantService.updateRestaurant(this.restaurant, oldName)
      .subscribe(
        generalResponse => {
          this.router.navigate(['/dashboard/home']);
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  delete(): void {
    this.restaurantService.deleteRestaurant(this.restaurant.name).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/home']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/dashboard/home']);
  }
}

function validateInputs() {
  function validateTime(input: HTMLInputElement, value: string) {
    var timeFormat = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    if (timeFormat.test(value) === false) {
      return false;
    }

    return true;
  }

  var validationError = false;

  var nameValue = validateInput('name', null);
  if (nameValue === null) validationError = true;

  var descriptionValue = validateInput('description', null);
  if (descriptionValue === null) validationError = true;

  var addressValue = validateInput('address', null);
  if (addressValue === null) validationError = true;

  var mOpenValue = validateInput('mOpen', validateTime);
  if (mOpenValue === null) validationError = true;

  var mCloseValue = validateInput('mClose', validateTime);
  if (mCloseValue === null) validationError = true;

  var tuOpenValue = validateInput('tuOpen', validateTime);
  if (tuOpenValue === null) validationError = true;

  var tuCloseValue = validateInput('tuClose', validateTime);
  if (tuCloseValue === null) validationError = true;

  var wOpenValue = validateInput('wOpen', validateTime);
  if (wOpenValue === null) validationError = true;

  var wCloseValue = validateInput('wClose', validateTime);
  if (wCloseValue === null) validationError = true;

  var thOpenValue = validateInput('thOpen', validateTime);
  if (thOpenValue === null) validationError = true;

  var thCloseValue = validateInput('thClose', validateTime);
  if (thCloseValue === null) validationError = true;

  var fOpenValue = validateInput('fOpen', validateTime);
  if (fOpenValue === null) validationError = true;

  var fCloseValue = validateInput('fClose', validateTime);
  if (fCloseValue === null) validationError = true;

  var saOpenValue = validateInput('saOpen', validateTime);
  if (saOpenValue === null) validationError = true;

  var saCloseValue = validateInput('saClose', validateTime);
  if (saCloseValue === null) validationError = true;

  var suOpenValue = validateInput('suOpen', validateTime);
  if (suOpenValue === null) validationError = true;

  var suCloseValue = validateInput('suClose', validateTime);
  if (suCloseValue === null) validationError = true;

  if (validationError) return null;

  return {
    name: nameValue,
    description: descriptionValue,
    address: addressValue,
    mOpen: mOpenValue,
    mClose: mCloseValue,
    tuOpen: tuOpenValue,
    tuClose: tuCloseValue,
    wOpen: wOpenValue,
    wClose: wCloseValue,
    thOpen: thOpenValue,
    thClose: thCloseValue,
    fOpen: fOpenValue,
    fClose: fCloseValue,
    saOpen: saOpenValue,
    saClose: saCloseValue,
    suOpen: suOpenValue,
    suClose: suCloseValue,
  };
}

function validateInput(id: string, callback: any) {
  var input = (<HTMLInputElement>document.getElementById(id));
  var value = input.value;
  if (value === '' || (callback && !callback(input, value))) {
    hasError(input);
    return null;
  }

  hasNoError(input);
  return value;
}

function hasError(element: HTMLInputElement) {
  element.className += ' form-error';
}

function hasNoError(element: HTMLInputElement) {
  element.className = element.className.replace(/\bform-error\b/, '');
}
