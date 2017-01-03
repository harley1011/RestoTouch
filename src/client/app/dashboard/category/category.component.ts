import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from './category.service';
import { Category, CategoryTranslations } from '../../shared/models/category';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../shared/models/language';

@Component({
	moduleId: module.id,
	selector: 'category-cmp',
	templateUrl: 'category.component.html',
  providers: [CategoryService]
})

export class CategoryComponent implements OnInit {
	create: boolean;
  category: Category;
  errorMessage: string;

  //Multiple translation support
  languages: Array<Language>;
  addedLanguage: string;
  supportedLanguages: Array<Language> = [];
  selectedLanguage: Language = new Language('','','',0);

	constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
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
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
			if (params['id']) {
			  this.getCategory(params['id']);
				this.create = false;
			} else {
        let translation = new CategoryTranslations('', this.supportedLanguages[0].languageCode);
        this.category = new Category(this.supportedLanguages, [translation], translation);
				this.create = true;
      }
		});
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
