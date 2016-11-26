import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {MenuService} from './menu.service';
import {Menu, MenuTranslations} from '../../shared/models/menu';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';

//import {MenuCategoryService} from './menucatergory.service';
//import {CategoryService} from './category.service';

@Component({
	moduleId: module.id,
	selector: 'menu-cmp',
	templateUrl: 'menu.component.html',
  providers: [MenuService]
})

export class MenuComponent implements OnInit {
	create: boolean;
  menu : Menu;
  errorMessage: string;
  sections: string[];

  //Translation support
  languages: Array<Language>;
  addedLanguage: string;
  supportedLanguages: Array<Language> = [];
  selectedLanguage: Language = new Language('','','',0);

  // dummy data
  // categories:[{id:number , categoryName: string}];

	constructor(private route: ActivatedRoute,
              private menuService: MenuService,
              private languageService: LanguageService,
              //private menuCategoryService: MenuCategoryService,
              //private categoriyService: CategoryService,
              private router: Router) {
    this.languages = languageService.languages();
    languageService.selectedLanguageAnnounced$.subscribe(selectedLanguage => {
      this.selectedLanguage = selectedLanguage;
      this.menu.selectedTranslation = this.menu.translations.find(translation =>
        translation.languageCode === this.selectedLanguage.languageCode);

      if(!this.menu.selectedTranslation) {
        this.menu.selectedTranslation = new MenuTranslations('',this.selectedLanguage.languageCode);
        this.menu.translations.push(this.menu.selectedTranslation);
      }
    });
    //default to english
    this.supportedLanguages.push(this.languages.find(language => language.languageCode === 'en'));

    this.languageService.announceSupportedLanguages(this.supportedLanguages);
  }

  addLanguage() {
    let language = this.supportedLanguages.find(language => language.languageCode === this.addedLanguage);
    if (language) {
      console.log('Language is already supported.');
      return;
    }
    language = this.languages.find(language => language.languageCode === this.addedLanguage);
    this.supportedLanguages.push(language);
    let newTranslation = new MenuTranslations('', language.languageCode);
    this.menu.translations.push(newTranslation);
  }

  removeLanguage(language: Language) {
    if (this.supportedLanguages.length < 1) {
      console.log('At least one supported language is required.');
    }
    let i = this.supportedLanguages.indexOf(language);
    this.supportedLanguages.splice(i, 1);
    let removedTranslation = this.menu.translations.find(translation =>
      translation.languageCode === language.languageCode);
    let j = this.menu.translations.indexOf(removedTranslation);
    this.menu.translations.splice(j, 1);
  }

	getMenu(id: number): void {
	  this.menuService.getMenu(id).subscribe(
	    menu => {
	      this.menu = menu;
        this.supportedLanguages = menu.supportedLanguages;
        this.menu.selectedTranslation = menu.translations[0];
        this.selectedLanguage = this.languages.find(language =>
          language.languageCode === this.menu.selectedTranslation.languageCode);
        this.languageService.announceSupportedLanguages(this.supportedLanguages);
        this.languageService.announceSelectedLanguage(this.selectedLanguage);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  ngOnInit(): void {

    //get all categpries (api)
    //for now Dummy data from category api
/*    var categories = [
      { id: 1, categoryName: 'hamburger'},
      { id: 2, categoryName: 'drink'},
      { id: 3, categoryName: 'sandowish'},
      { id: 4, categoryName: 'salad'},
      { id: 5, categoryName: 'icecream'},
      { id: 6, categoryName: 'starter'},
      { id: 7, categoryName: 'sweets'},
      { id: 8, categoryName: 'specials'},
    ];*/

    this.sections = [];
		this.route.params.forEach((params: Params) => {
			if (params['menuId']) {
			  this.getMenu(params['menuId']);
				this.create = false;
			} else {
        let translation = new MenuTranslations('', this.supportedLanguages[0].languageCode);
			  this.menu = new Menu(this.supportedLanguages, [translation], translation);
				this.create = true;
			}
		});
  }

  // 'Create' button functionality
  addAndUpdate(): void {

    var values = validateInputs();
    if (values === null) return;

    var oldName = this.menu.selectedTranslation.name;
    this.menu.selectedTranslation.name = values['name'];

    if (this.create) {
      this.add();
    } else {
      this.update(oldName);
    }
  }

  addSection(): void {
    // get the list of categories
    // select which category to add
    this.sections.push('aCategory');
  }

  removeSection(): void {
    this.sections.pop();
  }

  add(): void {

    // calling add menuservice
    this.menuService.addMenu(this.menu).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/menus']);
      },
      error => {
        this.errorMessage = <any> error;
      }
    );
    // TODO loop
    // calling add menucategoryservice
    /*this.menuCategoryService.addMenuCategory(this.menu.id, this.categories.id).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/menus']);
      },
      error => {
        this.errorMessage = <any> error;
      }
    );*/
  }

  update(oldName : string): void {
    this.menuService.updateMenu(this.menu).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/menus']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );

    // calling update in  menucategoryservice
    // updateMenuCategory(): void {}

  }

  cancel(): void {
    this.router.navigate(['/dashboard/menus']);
  }

  delete(): void {
    this.menuService.deleteMenu(this.menu).subscribe(
      generalResponse => {
        console.log('response', generalResponse );
        this.router.navigate(['/dashboard/menus']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

}
function validateInputs () {

  var validationError = false;

  var nameValue = validateInput('name', null);
  if (nameValue === null) validationError = true;

  if (validationError) return null;

  return {
    name: nameValue,
  };
}

function validateInput (id: string, callback: any) {
  var input = (<HTMLInputElement>document.getElementById(id));
  var value = input.value;
  if (value === '' || (callback && !callback(input, value))) {
    hasError(input);
    return null;
  }

  hasNoError(input);
  return value;
}

function hasError (element: HTMLInputElement) {
  element.className += ' form-error';
}

function hasNoError (element: HTMLInputElement) {
  element.className = element.className.replace(/\bform-error\b/,'');
}
