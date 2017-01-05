import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MenuService} from './menu.service';
import {Category} from '../../shared/models/category';
import {CategoryService} from '../category/category.service';
import {Menu, MenuTranslations} from '../../shared/models/menu';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';

// This tells angular that MenuComponent class is actually an component which we put metadata on it.
@Component({
  moduleId: module.id,
  selector: 'menu-cmp',
  templateUrl: 'menu.component.html',
  providers: [MenuService, CategoryService], //Registering Services with angular.
})

export class MenuComponent implements OnInit {
  create: boolean;
  errorMessage: string;
  menu: Menu; // Menu has an array of selected categories that represent Category List
  availableCategories: Array<Category> = [];// This is the Available Category List
  menuCatUndefinedYet = true; // Because the html is accessing before i am able to push to this.menu.categories
  categoriesInDb: Array<Category> = [];

  //Translation support
  languages: Array<Language>;
  addedLanguage: string;
  supportedLanguages: Array<Language> = [];
  selectedLanguage: Language = new Language('', '', '', 0);


  // We are using dependency injection to get instances of these services into our component.
  constructor(private route: ActivatedRoute,
              private menuService: MenuService,
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
    this.route.params.forEach((params: Params) => {
      if (params['menuId']) {
        this.getMenu(params['menuId']);
        this.create = false;
      } else {
        this.getCategories();
        let translation = new MenuTranslations('', this.supportedLanguages[0].languageCode);
        this.menu = new Menu(this.supportedLanguages, [translation], translation, []);
        this.create = true;
      }
    });

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
        this.getCategories();
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.menu.categories.forEach(menuCategory => {
          let categoryToRemove = categories.find(category => menuCategory.id === category.id);
          if (categoryToRemove) {
            categories.splice(categories.indexOf(categoryToRemove), 1);
          }
        } );
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
    this.menu.selectedTranslation.name = values['name'];

    if (this.create) {
      this.add();
    } else {
      this.update();
    }
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

  changeOrder(category: Category, changeIndex: number) {
     let newIndex = ((this.menu.categories.indexOf(category) - 1 + changeIndex)
       % this.menu.categories.length + this.menu.categories.length) % this.menu.categories.length;
     let currentIndex = this.menu.categories.indexOf(category);

     this.menu.categories[currentIndex] = this.menu.categories[newIndex];
     this.menu.categories[newIndex] = category;
  }
  addCategoryToMenu(category: Category): void {
    this.availableCategories.splice(this.availableCategories.indexOf(category), 1);
    this.menu.categories.push(category);
  }

  update(): void {
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

  removeCategoryFromMenu(category: Category): void {
    this.menu.categories.splice(this.menu.categories.indexOf(category), 1);
    this.availableCategories.push(category);
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
