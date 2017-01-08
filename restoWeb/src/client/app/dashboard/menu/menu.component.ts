import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MenuService} from './menu.service';
import {CategoryCheckboxList, ItemCheckbox} from './category-checkbox-list';
import {Category} from '../../shared/models/category';
import {CategoryService} from '../category/category.service';
import {Menu, MenuTranslations} from '../../shared/models/menu';
import {Item} from '../../shared/models/items';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';
import {ItemCategory} from '../../shared/models/item-category';

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
  availableCategories: Array<Category> = []; // This is the Available Category List
  itemCategories: Array<CategoryCheckboxList> = [];

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

  // We are using dependency injection to get instances of these services into our component.
  constructor(private route: ActivatedRoute,
              private menuService: MenuService,
              private categoryService: CategoryService,
              private languageService: LanguageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['menuId']) {
        this.getMenu(params['menuId']);
        this.create = false;
      } else {
        this.getCategories();
        let translation = new MenuTranslations('', this.translationSelectComponent.selectedLanguage.languageCode);
        this.menu = new Menu([translation], translation, [], []);
        this.create = true;
      }
    });
  }

  getMenu(id: number): void {
    this.menuService.getMenu(id).subscribe(
      menu => {
        this.menu = menu;
        this.onSelectLanguage(this.translationSelectComponent.selectedLanguage);
        this.getCategories();
        this.initializeItemCategories();
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        console.log(categories);
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

  initializeItemCategories(): void {
    let self = this;
    let catCheckList: CategoryCheckboxList;
    let itemCheck: ItemCheckbox;
    let itemCategory: ItemCategory;
    this.menu.categories.forEach(function (category) {
      catCheckList = new CategoryCheckboxList(category, []);
      category.items.forEach(function (item) {
        itemCheck = new ItemCheckbox(item, true);

        for (var i = 0; i < self.menu.disabledCategoryItems.length; i++) {
          itemCategory = self.menu.disabledCategoryItems[i]
          if (itemCategory.categoryId === category.id && itemCategory.itemId === item.id) {
            itemCheck.enabled = false;
            break;
          }
        }

        catCheckList.items.push(itemCheck);
      });

      self.itemCategories.push(catCheckList);
    });
  }

  onSelectLanguage(language: Language) {
    let menuTranslation = this.menu.translations.find(translation =>
    translation.languageCode === language.languageCode);
    if (!menuTranslation) {
      menuTranslation = new MenuTranslations('', language.languageCode);
      this.menu.translations.push(menuTranslation);
    }
    this.menu.selectedTranslation = menuTranslation;
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

  changeOrder(catCheckList: CategoryCheckboxList, changeIndex: number) {
    var category = catCheckList.category;
    let newIndex = ((this.menu.categories.indexOf(category) - 1 + changeIndex)
       % this.menu.categories.length + this.menu.categories.length) % this.menu.categories.length;
    let currentIndex = this.menu.categories.indexOf(category);

    this.menu.categories[currentIndex] = this.menu.categories[newIndex];
    this.menu.categories[newIndex] = category;
  }

  addCategoryToMenu(category: Category): void {
    this.availableCategories.splice(this.availableCategories.indexOf(category), 1);
    this.menu.categories.push(category);

    var catCheckList = new CategoryCheckboxList(category, []);
    let itemCheck: ItemCheckbox;
    category.items.forEach(function (item) {
      itemCheck = new ItemCheckbox(item, true);
      catCheckList.items.push(itemCheck);
    });
    this.itemCategories.push(catCheckList);
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

  removeCategoryFromMenu(catCheckList: CategoryCheckboxList): void {
    var category = catCheckList.category;
    this.menu.categories.splice(this.menu.categories.indexOf(category), 1);
    this.availableCategories.push(category);
    this.itemCategories.splice(this.itemCategories.indexOf(catCheckList), 1);

    let itemCategory: ItemCategory;
    for (var i = 0; i < this.menu.disabledCategoryItems.length; i++) {
      itemCategory = this.menu.disabledCategoryItems[i];
      if (itemCategory.categoryId === catCheckList.category.id) {
        this.menu.disabledCategoryItems.splice(i--, 1);
      }
    }
  }

  selectItem(catCheckList: CategoryCheckboxList, itemCheck: ItemCheckbox): void {
    var enabled = itemCheck.enabled;
    let itemCategory: ItemCategory;
    if (enabled) {
      for (var i = 0; i < this.menu.disabledCategoryItems.length; i++) {
        itemCategory = this.menu.disabledCategoryItems[i];
        if (itemCategory.itemId === itemCheck.item.id &&
          itemCategory.categoryId === catCheckList.category.id) {
          this.menu.disabledCategoryItems.splice(i, 1);
          break;
        }
      }
    } else {
      this.menu.disabledCategoryItems.push(
        new ItemCategory(itemCheck.item.id, catCheckList.category.id)
      );
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
