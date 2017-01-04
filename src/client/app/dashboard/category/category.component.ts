import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from './category.service';
import { Category, CategoryTranslations } from '../../shared/models/category';
import { ItemService } from '../item/item.service';
import { Item } from '../../shared/models/items';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../shared/models/language';

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

  //Multiple translation support
  languages: Array<Language>;
  addedLanguage: string;
  supportedLanguages: Array<Language> = [];
  selectedLanguage: Language = new Language('','','',0);

	constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
							private itemService: ItemService,
              private router: Router,
              private languageService: LanguageService) {
    this.languages = languageService.languages();
    languageService.selectedLanguageAnnounced$.subscribe(selectedLanguage => {
      this.selectedLanguage = selectedLanguage;
      this.category.selectedTranslation = this.category.translations.find(translation =>
        translation.languageCode === this.selectedLanguage.languageCode);

      if(!this.category.selectedTranslation) {
        this.category.selectedTranslation = new CategoryTranslations('',this.selectedLanguage.languageCode);
        this.category.translations.push(this.category.selectedTranslation);
      }
    });
    this.supportedLanguages.push(this.languages.find(language => language.languageCode === 'en'));
    this.languageService.announceSupportedLanguages(this.supportedLanguages);
  }

  getCategory(id: number): void {
	  this.categoryService.getCategory(id).subscribe(
	    category => {
	      this.category = category;
        this.supportedLanguages = category.supportedLanguages;
        this.category.selectedTranslation = category.translations[0];
        this.selectedLanguage = this.languages.find(language =>
          language.languageCode === this.category.selectedTranslation.languageCode);
        this.languageService.announceSupportedLanguages(this.supportedLanguages);
        this.languageService.announceSelectedLanguage(this.selectedLanguage);
				this.category.items.forEach(item => {
					item.selectedTranslation = item.translations[0];
				});
				this.category.items.sort(compareItem);
        this.getItems();
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
        this.getItems();
        let translation = new CategoryTranslations('', this.supportedLanguages[0].languageCode);
        this.category = new Category(this.supportedLanguages, [translation], translation, []);
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
        console.log('response', generalResponse );
        this.router.navigate(['/dashboard/categories']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  addLanguage() {
    let language = this.supportedLanguages.find(language => language.languageCode === this.addedLanguage);
    if(language) {
      console.log('Language is already supported.');
      return;
    }
    language = this.languages.find(language => language.languageCode === this.addedLanguage);
    this.supportedLanguages.push(language);
    let newTranslation = new CategoryTranslations('', language.languageCode);
    this.category.translations.push(newTranslation);
  }

  removeLanguage(language: Language) {
    if(this.supportedLanguages.length < 1) {
      console.log('At least one language is required.');
    }
    let i = this.supportedLanguages.indexOf(language);
    this.supportedLanguages.splice(i, 1);
    let removedTranslation = this.category.translations.find(translation =>
      translation.languageCode === language.languageCode);
    let j = this.category.translations.indexOf(removedTranslation);
    this.category.translations.splice(j, 1);
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
