import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';

@Component({
    moduleId: module.id,
    selector: 'category-cmp',
    templateUrl: 'category.component.html',
    providers: [CategoryService]
})

export class CategoryComponent implements OnInit {
    isEditable: boolean;
    categories: Category[];

    constructor(private categoryService: CategoryService) { }

    getCategories(): void {
      // Subscribe to the getCategories observable
      this.categoryService.getCategories().subscribe(
        categories => {this.categories = categories;},
        error => {console.log(error);}
      );
    };

    ngOnInit(): void {
        this.isEditable = false;
        this.getCategories();
    }
    changeInput(): void {
        if(this.isEditable === false) {
            this.isEditable = true;
        } else {
            this.isEditable = false;
        }
    }
}
