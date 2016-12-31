import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MenuService} from './menu.service';
import {Category} from '../../shared/models/category';
import {MenuCategoryService} from '../menu/menu-catergory.service';
import {CategoryService} from '../category/category.service';
import {Menu, MenuTranslations} from '../../shared/models/menu';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';

// This tells angular that MenuComponent class is actually an component which we put metadata on it.
@Component({
  moduleId: module.id,
  selector: 'menu-cmp',
  templateUrl: 'menu.component.html',
  providers: [MenuService, CategoryService, MenuCategoryService], //Registering Services with angular.
})

export class MenuComponent implements OnInit {

  create: boolean;
  undef_error: boolean;
  errorMessage: string;
  menu: Menu; // Menu has an array of selected categories that represent Category List
  availableCategories: Array<Category> = [];// This is the Available Category List
  menuCatUndefinedYet = true; // Because the html is accessing before i am able to push to this.menu.categories
  categoriesInDb: Array<Category> = [];
  sections: string[];

  //Translation support
  languages: Array<Language>;
  addedLanguage: string;
  supportedLanguages: Array<Language> = [];
  selectedLanguage: Language = new Language('', '', '', 0);


  // We are using dependency injection to get instances of these services into our component.
  constructor(private route: ActivatedRoute,
              private menuService: MenuService,
              private menuCategoryService: MenuCategoryService,
              private categoryService: CategoryService,
              private languageService: LanguageService,
              private router: Router) {
    this.languages = languageService.languages();
    languageService.selectedLanguageAnnounced$.subscribe(selectedLanguage => {
      this.selectedLanguage = selectedLanguage;
      this.menu.selectedTranslation = this.menu.translations.find(translation =>
      translation.languageCode === this.selectedLanguage.languageCode);

      if (!this.menu.selectedTranslation) {
        this.menu.selectedTranslation = new MenuTranslations('', this.selectedLanguage.languageCode);
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


  ngOnInit(): void {

    this.sections = [];
    this.route.params.forEach((params: Params) => {
      if (params['menuId']) {
        this.getMenu(params['menuId']);
        this.create = false;
      } else {
        let translation = new MenuTranslations('', this.supportedLanguages[0].languageCode);
        this.menu = new Menu(this.supportedLanguages, [translation], translation, []);
        this.create = true;
      }
    });

    this.getCategories();
    //this.menuCategoryService.addMenuCategory(1, 1, 1); //TODO : TESTING To remove
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

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.availableCategories = categories;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
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
    // // 1. clean the database for menuCategory model
    // for(let i = 0; i < this.categoriesInDb.length; i++) {
    //  this.menuCategoryService.deleteMenuCategory(this.menu.id, this.categoriesInDb[i].id);
    // }
    //
    // // 2. add new user selected categories (menu.categories) into the database
    // // The order is the order of the index i of menu.categories
    // for(let i = 0; i < this.menu.categories.length; i++) {
    //   this.menuCategoryService.addMenuCategory(this.menu.id, this.menu.categories[i].id, i);
    // }
  }

  add(): void {
    this.menuService.addMenu(this.menu).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/menus']);
      },
      error => {
        this.errorMessage = <any> error;
      }
    );
  }

  addCategoryToMenu(category: Category): void {
      //event.preventDefault();
    this.availableCategories.splice(this.availableCategories.indexOf(category), 1);
    this.menu.categories.push(category);
  }

  update(oldName: string): void {
    this.menuService.updateMenu(this.menu).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/menus']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/dashboard/menus']);
  }

  delete(): void {
    this.menuService.deleteMenu(this.menu).subscribe(
      generalResponse => {
        console.log('response', generalResponse);
        this.router.navigate(['/dashboard/menus']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  deleteCatClick(event: Event, catid: number): void {
    if (catid) {
      event.preventDefault();
      if (!(this.create)) {
        for (let i = 0; i < this.menu.categories.length; i++) {
          if (this.menu.categories[i].id === catid) {
            this.availableCategories.push(this.menu.categories[i]);
            this.menu.categories.splice(i, 1);
          }
        }
      }
    }
  }
}


function validateInputs() {

  var validationError = false;

  var nameValue = validateInput('name', null);
  if (nameValue === null) validationError = true;

  if (validationError) return null;

  return {
    name: nameValue,
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
