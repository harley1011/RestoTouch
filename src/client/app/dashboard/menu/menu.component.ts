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
  providers: [MenuService, CategoryService, MenuCategoryService] //Registering Services with angular.
})

export class MenuComponent implements OnInit {

  categoriesTest: Array<string> = ['Salads', 'Deserts', 'Burgers', 'Sandwiches', 'Drinks'];
  availableCategoryList: Array<string> = []; // The list of available categories.
  categoryList: Array<string> = []; // The user selected categories.

  create: boolean;
  errorMessage: string;
  menu: Menu; // Menu has an array of selected categories that represent Category List
  categories: Category [];// This is the Available Category List
  typeAvailable: boolean[];// If value is false then the category is not in Available Category List but in Category List
  toAdd: boolean;
  toUpdate: boolean;
  toRemove: boolean;

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
    //  this.getCategories();

    /* PROBLEM: It seems whenever i push a string to the arrays of strings of 'categoriesTest, availableCategoryList, and categoryList'
     *          all the containers cannot get their element back once the element has been dragged away from its container.
     */
    //this.categoriesTest.push('hi1');
    //this.availableCategoryList.push('hi1');
    //this.categoryList.push('hi1');
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
/*

   getCategories(): void {
     this.categoryService.getCategories().subscribe(
       categories => {

         this.categories = categories;
         this.typeAvailable = new Array(this.categories.length);
         this.toAdd = false;
         this.toUpdate = false;
         this.toRemove = false;

         // If (user's first time to create a menu then all the categories we got are of type available)
         if (this.menu.name === undefined) {
           for (let i = 0; i < this.categories.length; i++) {
             this.typeAvailable[i] = true;
           }
           return;
         }
         // else
         for (let i = 0; i < this.categories.length; i++) {
           for (let j = 0; j < this.menu.categories.length; j++) {
             if (this.categories[i].categoryName === this.menu.categories[j].categoryName) {
               this.typeAvailable[i] = false;
               break;
             }
           }
         }
       },
       error => {
        this.errorMessage = <any>error;
       }
     );
   }
*/

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

    // Display all the categories in the available categories
    // this.getCategories();
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


