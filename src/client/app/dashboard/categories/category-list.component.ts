import { Component, OnInit } from '@angular/core';
import { Category, CategoryTranslations } from '../../shared/models/category';
import { CategoryService } from './category.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Language } from '../../shared/models/language';
import { LanguageService } from '../../services/language.service';

@Component({
    moduleId: module.id,
    selector: 'category-list-cmp',
    templateUrl: 'category-list.component.html',
    providers: [CategoryService]
})

export class CategoryListComponent implements OnInit {
    isEditable: boolean; // Determine if a field is editable
    categories: Category[]; // Contains the returned list of category
    category: Category; // instance of a category
    catId: number;
    catNewName: string;

    //Language & translations 
    hideManageLanguage = false;
    languages: Array<Language>; // All languages
    selectedLanguage: Language; // Selected language from the nav-bar
    supportedLanguages: Array<Language> = []; //Supported languages chosen in the manage language section
    addedLanguage: string; //Added language from manage language section
    translationArray: Array<CategoryTranslations> = []; //Translations for categories

    constructor(private categoryService: CategoryService,
                private route: ActivatedRoute,
                private router: Router,
                private languageService: LanguageService) {
      this.languages = languageService.languages();
      this.supportedLanguages.push(this.languages.find(language => language.languageCode === 'en'));
      this.languageService.announceSupportedLanguages(this.supportedLanguages);
      this.selectedLanguage = this.languages.find(language => language.languageCode === 'en');
      languageService.announceSelectedLanguage(this.selectedLanguage);
      languageService.selectedLanguageAnnounced$.subscribe(selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
      });
    }

    ngOnInit(): void {
        this.isEditable = false;
        this.getCategories();
        let translation = new CategoryTranslations('','');
        this.category = new Category('',this.translationArray,translation);
    }

    ///////////////////////////////////////////////////////////////

    //Show/Hide the manage language section
    toggleShowManageLanguage(): void {
      this.hideManageLanguage = !this.hideManageLanguage;
    }

    //Add a supported language
    addLanguage() {
      let language = this.supportedLanguages.find(language => language.languageCode === this.addedLanguage);
      if (language) {
          //todo: remove this once the supported languages are removed from the languages
          console.log('Language is already supported');
          return;
        }
      language = this.languages.find(language => language.languageCode === this.addedLanguage);
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

    /**
     * Gets user's categories
     */
    getCategories(): void {
      // Subscribe to the getCategories observable
      this.categoryService.getCategories().subscribe(
        categories => {this.categories = categories;},
        error => {console.log(error);}
      );
    }

    /**
     * Adds a new category
     */
     addCategory(): void {
       this.categoryService.addCategory(this.category)
           .subscribe(
              generalResponse => {this.getCategories();},
              error => {console.log(error);}
            );
     }

     /**
      * Deletes a category
      */
      deleteCategory():void {
        this.categoryService.deleteCategory(this.catId)
            .subscribe(
              generalResponse => {this.getCategories();},
              error => {console.log(error);}
            );
      }

      /**
       * Update a category
       */
      updateCategory(): void {
        this.categoryService.updateCategory(this.category,this.catId)
            .subscribe(
              generalResponse => {this.getCategories();},
              error => {console.log(error);}
            );
      }

    // Btn Handlers //////////////////////////////////////////////
    /**
     * Toggles the tile user input
     */
    changeInput(): void {
        if(this.isEditable === false) {
            this.isEditable = true;
        } else {
            this.isEditable = false;
        }
    }

    /**
     * Adds a new category
     */
    addNewCatClick(event: Event,newCat: string): void {
      if(newCat) {
        event.preventDefault();
        this.category.categoryName = newCat;
        this.addCategory();
      }
    }

    /**
     * Adds a new category
     */
    deleteCatClick(event: Event,id: number): void {
      if(id) {
        event.preventDefault();
        this.catId = id;
        this.deleteCategory();
      }
    }

    updateCatClick(event: Event, newName: string, id: number): void {
      if(newName) {
        this.category.categoryName = newName;
        this.catId = id;
        this.updateCategory();
      }
    }
}
