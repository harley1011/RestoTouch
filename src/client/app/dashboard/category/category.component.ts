import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './category.service';
import { Category } from '../../shared/models/category';

@Component({
	moduleId: module.id,
	selector: 'category-cmp',
	templateUrl: 'category.component.html',
  providers: [CategoryService]
})

export class CategoryComponent implements OnInit {
	create: boolean;
  category : Category;
  errorMessage: string;
  // dummy data
  // categories:[{id:number , categoryName: string}];

	constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private router: Router) {}

    getCategory(name: string): void {
	  this.categoryService.getCategories(name).subscribe(
	    menu => {
	      this.category = category;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
			if (params['name']) {
			  this.getCategory(params['name']);
				this.create = false;
			} else {
			  this.category = new Category('');
				this.create = true;
			}
		});
  }

  // 'Create' button functionality
  addAndUpdate(): void {

    var values = validateInputs();
    if (values === null) return;

//    var oldName = this.category.categoryName;
    this.category.categoryName = values['name'];

    if (this.create) {
      this.add();
    } else {
      this.update(this.category.id);
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

  update(oldName : string): void {
    this.categoryService.updateCategory(this.category, oldName).subscribe(
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
    this.categoryService.deleteCategory(this.category.categoryName).subscribe(
      generalResponse => {
        console.log('response', generalResponse );
        this.router.navigate(['/dashboard/categories']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

}
function validateInputs () {

  var validationError = false;

  var nameValue = validateInput('name', null);
  if (nameValue === null) validationError = true;

  if (validationError) return null;

  return {
    name: nameValue,
  };
}

function validateInput (id: string, callback: any) {
  var input = (<HTMLInputElement>document.getElementById(id));
  var value = input.value;
  if (value === '' || (callback && !callback(input, value))) {
    hasError(input);
    return null;
  }

  hasNoError(input);
  return value;
}

function hasError (element: HTMLInputElement) {
  element.className += ' form-error';
}

function hasNoError (element: HTMLInputElement) {
  element.className = element.className.replace(/\bform-error\b/,'');
}
