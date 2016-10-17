import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category';
import { CategoryService } from './category.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'category-cmp',
    templateUrl: 'category.component.html',
    providers: [CategoryService]
})

export class CategoryComponent implements OnInit {
    isEditable: boolean; // Determine if a field is editable
    categories: Category[]; // Contains the returned list of category
    category: Category; // instance of a category
    catId: number;
    catNewName: string;

    constructor(private categoryService: CategoryService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit(): void {
        this.isEditable = false;
        this.getCategories();
        this.category = new Category('');
    }

    ///////////////////////////////////////////////////////////////

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
