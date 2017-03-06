import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CategoryService} from './category.service';
import {Category, CategoryTranslations} from '../../shared/models/category';
import {Language} from '../../shared/models/language';
import { ItemService } from '../item/item.service';
import { Item } from '../../shared/models/items';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';

@Component({
	moduleId: module.id,
	selector: 'category-cmp',
	templateUrl: 'category.component.html',
  providers: [CategoryService, ItemService]
})

export class CategoryComponent implements OnInit {
  create: boolean;
  category: Category;
	items: Array<Item>;
  errorMessage: string;
  @ViewChild(TranslationSelectComponent) translationSelectComponent: TranslationSelectComponent;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private router: Router,
              private itemService: ItemService) {

  }

  getCategory(id: number): void {
    this.categoryService.getCategory(id).subscribe(
      category => {
        this.category = category;
        this.getItems();
        this.onSelectLanguage(this.translationSelectComponent.selectedLanguage);
        this.category.items.forEach(item => {
          item.selectedTranslation = item.translations[0];
        });
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

	getItems(): void {
		this.itemService.getItems().subscribe(
			items => {
				let exists = false;
				let item: Item;
				let category: Category;
				for (var i = 0; i < items.length; i++) {
					item = items[i];
					for (var j = 0; j < item.categories.length; j++) {
						category = item.categories[j];
						if (category.id === this.category.id) {
							exists = true;
							break;
						}
					}

					if (exists) {
						exists = false;
						items.splice(i--, 1);
						continue;
					}
					item.selectedTranslation = item.translations[0];
				}

        this.items = items;
				this.items.sort(compareItem);
    	},
      error =>  {
        console.log(error);
      }
    );
	}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.getCategory(params['id']);
        this.create = false;
      } else {
        let translation = new CategoryTranslations('', this.translationSelectComponent.selectedLanguage.languageCode);
        this.category = new Category([translation], translation, [], []);
        this.getItems();
        this.create = true;
      }
    });
  }

	addItemToCategory(item: Item): void {
    this.items.splice(this.items.indexOf(item), 1);
    this.category.items.push(item);

		this.items.sort(compareItem);
		this.category.items.sort(compareItem);
  }

	removeItemFromCategory(item: Item): void {
    this.category.items.splice(this.category.items.indexOf(item), 1);
    this.items.push(item);

		this.items.sort(compareItem);
		this.category.items.sort(compareItem);
  }

  // 'Create' button functionality
  onSelectLanguage(language: Language) {
    let restaurantTranslation = this.category.translations.find(translation =>
    translation.languageCode === language.languageCode);
    if (!restaurantTranslation) {
      restaurantTranslation = new CategoryTranslations('', language.languageCode);
      this.category.translations.push(restaurantTranslation);
    }
    this.category.selectedTranslation = restaurantTranslation;
  }

  addAndUpdate(): void {
    if (this.create) {
      this.add();
    } else {
      this.update();
    }
  }

  add(): void {
    // calling add categoryService
    this.categoryService.addCategory(this.category).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/categories']);
      },
      error => {
        this.errorMessage = <any> error;
      }
    );
  }

  update(): void {
    this.categoryService.updateCategory(this.category).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/categories']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );

  }

  cancel(): void {
    this.router.navigate(['/dashboard/categories']);
  }

  delete(): void {
    this.categoryService.deleteCategory(this.category).subscribe(
      generalResponse => {
        console.log('response', generalResponse);
        this.router.navigate(['/dashboard/categories']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }
}


function compareItem(item1: Item, item2: Item) {
  if (item1.selectedTranslation.name < item2.selectedTranslation.name) {
    return -1;
  } else if (item1.selectedTranslation.name > item2.selectedTranslation.name) {
    return 1;
	} else {
		return 0;
	}
}

function hasError(element: HTMLInputElement) {
  element.className += ' form-error';
}

function hasNoError(element: HTMLInputElement) {
  element.className = element.className.replace(/\bform-error\b/, '');
}
