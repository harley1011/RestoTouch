import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category';
import { CategoryService } from '../category/category.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'category-list-cmp',
    templateUrl: 'category-list.component.html',
    providers: [CategoryService]
})

export class CategoryListComponent implements OnInit {
    categories: Category[]; // Contains the returned list of category

    constructor(private categoryService: CategoryService,
                private router: Router) { }

    ngOnInit(): void {
        this.getCategories();
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

    add(): void {
        this.router.navigate(['/dashboard/category']);
    }

    modify(category: Category): void {
        this.router.navigate(['/dashboard/category', category.id]);
    }
}
