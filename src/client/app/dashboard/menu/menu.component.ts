import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MenuService} from './menu.service';
import {Menu} from '../../shared/models/menu';
import {Category} from '../../shared/models/category';
import {MenuCategoryService} from '../menu/menu-catergory.service';
import {CategoryService} from '../categories/category.service';

// This tells angular that MenuComponent class is actually an component which we put metadata on it.
@Component({
  moduleId: module.id,
  selector: 'menu-cmp',
  templateUrl: 'menu.component.html',
  providers: [MenuService, CategoryService, MenuCategoryService], //Registering Services with angular.
})

export class MenuComponent implements OnInit {

  create: boolean;
  errorMessage: string;
  menu: Menu; // Menu has an array of selected categories that represent Category List
  categories: Category [];// This is the Available Category List

  availableCategories: Array<string> = [];
  userCategories: Array<string> = [];


  // We are using dependency injection to get instances of these services into our component.
  constructor(private route: ActivatedRoute,
              private menuService: MenuService,
              private menuCategoryService: MenuCategoryService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {

    this.route.params.forEach((params: Params) => {
      if (params['name']) {
        this.getMenu(params['name']);
        this.create = false;
      } else {
        this.menu = new Menu('',[]);
        this.create = true;
      }
    });
      this.getCategories();

  }

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
   getCategories(): void {
     this.categoryService.getCategories().subscribe(
       categories => {
         this.categories = categories;
       },
       error => {
        this.errorMessage = <any>error;
       }
     );
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
    //this.addMenuCategories();
  }

/*
   addMenuCategories(): void {
     //TODO calling addMenuCategory from menucategoryservice
     for(let catindex = 0; catindex < this.categories.length; catindex++) {
       if(this.categoryList[catindex] === true) {
         this.menuCategoryService.addMenuCategory(this.menu.id, this.category.id).subscribe(
           generalResponse => {
            this.router.navigate(['/dashboard/menus']);
           },
           error => {
            this.errorMessage = <any> error;
           }
         );
       }
     }
   }*/

  add(): void {

    this.menuService.addMenu(this.menu).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/menus']);
      },
      error => {
        this.errorMessage = <any> error;
      }
    );
  }


  update(oldName: string): void {
    this.menuService.updateMenu(this.menu, oldName).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/menus']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );

/*
     //TODO calling updateMenuCategory from menucategoryservice
     for(let i = 0; i < this.categoryList.length; i++) {
       if (this.categoryList[i] === true) {
         this.menuCategoryService.updateMenuCategory(this.menu.id , this.category.id).subscribe(
           generalResponse => {
            this.router.navigate(['/dashboard/menus']);
           },
           error => {
            this.errorMessage = <any> error;
           }
         );
       }
     }
*/
  }

  cancel(): void {
    this.router.navigate(['/dashboard/menus']);
  }

  delete(): void {
    this.menuService.deleteMenu(this.menu.name).subscribe(
      generalResponse => {
        console.log('response', generalResponse);
        this.router.navigate(['/dashboard/menus']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

/*
    //TODO calling deleteMenuCategory from menucategoryservice
   // By checking which selected categories are not in the 'Available Category' list then we know which one to delete.
   for (let i = 0; i <= this.availableCategoryList.length - 1; i++) {
     for (let j = 0; j < this.categoryList.length; i++) {
       if (this.categoryList[i] === true) {
         this.menuCategoryService.deleteMenuCategory(this.menu.id, this.category.id).subscribe(
           generalResponse => {
            this.router.navigate(['/dashboard/menus']);
           },
           error => {
            this.errorMessage = <any> error;
           }
         );
       }
     }
   }
   */
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


