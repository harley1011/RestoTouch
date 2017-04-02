import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Restaurant, RestaurantTranslations} from '../../shared/models/restaurant';
import {MenuService} from './menu.service';
import {MenuListService} from '../menu-list/menu-list.service';
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
  providers: [MenuService, CategoryService, MenuListService], //Registering Services with angular.
})

export class MenuComponent implements OnInit {
  create: boolean;
  errorMessage: string;
  restaurant: Restaurant;
  menu: Menu; // Menu has an array of selected categories that represent Category List
  availableCategories: Array<Category> = []; // This is the Available Category List
  itemCategories: Array<CategoryCheckboxList> = [];

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

  // We are using dependency injection to get instances of these services into our component.
  constructor(private route: ActivatedRoute,
              private menuService: MenuService,
              private menuListService: MenuListService,
              private categoryService: CategoryService,
              private languageService: LanguageService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['menuId']) {
        this.getMenu(params['menuId']);
        this.create = false;
        this.restaurant = params['restaurant'];
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
        this.menu.categories.forEach(menuCategory => {
          let categoryToRemove = categories.find(category => menuCategory.id === category.id);
          if (categoryToRemove) {
            categories.splice(categories.indexOf(categoryToRemove), 1);
          }
        } );
        this.availableCategories = categories;
        this.availableCategories.sort(compareCategory);
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
        itemCheck = new ItemCheckbox(item, item.ItemCategory.id, true);

        for (var i = 0; i < self.menu.disabledCategoryItems.length; i++) {
          itemCategory = self.menu.disabledCategoryItems[i];
          if (itemCategory.categoryId === category.id && itemCategory.itemId === item.id) {
            itemCheck.enabled = false;
            break;
          }
        }

        catCheckList.items.push(itemCheck);
      });

      catCheckList.items.sort(compareItemCheckbox);
      self.itemCategories.push(catCheckList);
    });
    self.itemCategories.sort(compareCategoryCheckList);
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

  addMoreStep(): void {
    this.menuService.addMenu(this.menu).subscribe(
      generalResponse => {
         this.router.navigate(['/dashboard/category']);
       },
      error => {
        this.errorMessage = <any> error;
      }
    );

  }


  changeOrder(catCheckList: CategoryCheckboxList, changeIndex: number) {
    var currentIndex = this.itemCategories.indexOf(catCheckList);
    var newIndex = (currentIndex + changeIndex) % this.itemCategories.length;
    newIndex = (newIndex < 0) ? this.itemCategories.length-1 : newIndex;

    this.itemCategories[currentIndex] = this.itemCategories[newIndex];
    this.itemCategories[newIndex] = catCheckList;

    this.menu.categories[currentIndex] = this.menu.categories[newIndex];
    this.menu.categories[newIndex] = catCheckList.category;
  }

  addCategoryToMenu(category: Category): void {
    this.availableCategories.splice(this.availableCategories.indexOf(category), 1);
    this.menu.categories.push(category);

    var catCheckList = new CategoryCheckboxList(category, []);
    let itemCheck: ItemCheckbox;
    category.items.forEach(function (item) {
      itemCheck = new ItemCheckbox(item, item.ItemCategory.id, true);
      catCheckList.items.push(itemCheck);
    });
    catCheckList.items.sort(compareItemCheckbox);
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
    this.availableCategories.sort(compareCategory);
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
        new ItemCategory(itemCheck.item.id, catCheckList.category.id, itemCheck.itemCategoryId)
      );
    }
  }
}

function compareCategory (cat1: Category, cat2: Category) {
  if (cat1.translations[0].name < cat2.translations[0].name) {
    return -1;
  } else if (cat1.translations[0].name > cat2.translations[0].name) {
    return 1;
	} else {
		return 0;
	}
}

function compareCategoryCheckList (catCheck1: CategoryCheckboxList, catCheck2: CategoryCheckboxList) {
  var cat1 = catCheck1.category;
  var cat2 = catCheck2.category;

  if (cat1.MenuCategory.order < cat2.MenuCategory.order) {
    return -1;
  } else if (cat1.MenuCategory.order > cat2.MenuCategory.order) {
    return 1;
	} else {
		return 0;
	}
}

function compareItemCheckbox (item1: ItemCheckbox, item2: ItemCheckbox) {
  if (item1.item.translations[0].name < item2.item.translations[0].name) {
    return -1;
  } else if (item1.item.translations[0].name > item2.item.translations[0].name) {
    return 1;
	} else {
		return 0;
	}
}
