import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MenuService} from './menu.service';
import {MenuCategoryService} from './menucatergory.service';
import {Menu} from './menu';
//import {Category} from './category.service';

@Component({
	moduleId: module.id,
	selector: 'menu-cmp',
	templateUrl: 'menu.component.html',
	styleUrls: ['menu.css'],
  providers: [MenuService]
})

export class MenuComponent implements OnInit {
	create: boolean;
  menu : Menu;
  menuService: MenuService;
  menuCategoryService: MenuCategoryService;
  errorMessage: string;
  sections: string[];
  // dummy data
   categories:[{id:number , categoryName: string}];

	constructor(private route: ActivatedRoute,
              private menuService: MenuService,
              private router: Router) {}

	getMenu(name: string): void {
	  this.menuService.getMenu(name).subscribe(
	    menu => {
	      this.menu = menu;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  ngOnInit(): void {

    //get all categpries (api)
    //for now Dummy data from category api
    var categories = [
      { id: 1, categoryName: 'hamburger'},
      { id: 2, categoryName: 'drink'},
      { id: 3, categoryName: 'sandowish'},
      { id: 4, categoryName: 'salad'},
      { id: 5, categoryName: 'icecream'},
      { id: 6, categoryName: 'starter'},
      { id: 7, categoryName: 'sweets'},
      { id: 8, categoryName: 'specials'},
    ]

    this.sections = [];
		this.route.params.forEach((params: Params) => {
			if (params['name']) {
			  this.getMenu(params['name']);
				this.create = false;
			} else {
			  this.menu = new Menu('');
				this.create = true;
			}
		});
  }

  // 'Create' button functionality
  addAndUpdate(): void {

    var values = validateInputs();
    if (values === null) return;

    var oldName = this.menu.name;
    this.menu.name = values['name'];

    if (this.create) {
      this.add();
    } else {
      this.update(oldName);
    }
  }

  addSection(): void {
    // get the list of categories
    // select which category to add
    this.sections.push('aCategory');
  }

  removeSection(): void {
    this.sections.pop();
  }

  add(): void {

    // calling add menuservice
    this.menuService.addMenu(this.menu).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/menulist']);
      },
      error => {
        this.errorMessage = <any> error;
      }
    );
    // TODO loop
    // calling add menucategoryservice
    this.menuCategoryService.addMenuCategory(this.menu.id, this.categories.id).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/menulist']);
      },
      error => {
        this.errorMessage = <any> error;
      }
    );
  }

  update(oldName : string): void {
    this.menuService.updateMenu(this.menu, oldName).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/menulist']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );

    // calling update in  menucategoryservice
    // updateMenuCategory(): void {}

  }

  cancel(): void {
    this.router.navigate(['/dashboard/menulist']);
  }

  delete(): void {
    this.menuService.deleteMenu(this.menu.name).subscribe(
      generalResponse => {
        console.log('response', generalResponse );
        this.router.navigate(['/dashboard/menulist']);
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
