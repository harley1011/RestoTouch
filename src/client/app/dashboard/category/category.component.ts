import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CategoryService} from './category.service';
import {Category, CategoryTranslations} from '../../shared/models/category';
import {Language} from '../../shared/models/language';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';

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
  @ViewChild(TranslationSelectComponent) translationSelectComponent: TranslationSelectComponent;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private router: Router) {

  }

  getCategory(id: number): void {
    this.categoryService.getCategory(id).subscribe(
      category => {
        this.category = category;
        this.onSelectLanguage(this.translationSelectComponent.selectedLanguage);
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
        let translation = new CategoryTranslations('', this.translationSelectComponent.selectedLanguage.languageCode);
        this.category = new Category([translation], translation);
        this.create = true;
      }
    });
  }

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
    var values = validateInputs();
    if (values === null) return;

    //this.category.categoryName = values['name'];
    this.category.selectedTranslation.name = values['name'];

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
