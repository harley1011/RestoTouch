import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../../../../../restoCommon/shared/models/category';
import {Language} from '../../../../../../restoCommon/shared/models/language';
import {CategoryService} from '../category/category.service';
import {Router} from '@angular/router';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';

@Component({
  moduleId: module.id,
  selector: 'category-list-cmp',
  templateUrl: 'category-list.component.html',
  providers: [CategoryService]
})

export class CategoryListComponent implements OnInit {
  categories: Array<Category>;

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;
  constructor(private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        categories.forEach(category => {
          category.selectedTranslation = category.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelectLanguage(language: Language) {
    this.categories.forEach(category => {
      category.selectedTranslation = category.translations.find(translation => translation.languageCode === language.languageCode);
    });
  }

  add(): void {
    this.router.navigate(['/dashboard/category']);
  }

  modify(category: Category): void {
    this.router.navigate(['/dashboard/category', category.id]);
  }
}
