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
  availableCategories: Category [];// This is the Available Category List
  userSelectedCategories: Category [];
  menuCatUndefinedYet = true; // Because the html is accessing before i am able to push to this.menu.categories
  categoriesInDb: Category [];

  // We are using dependency injection to get instances of these services into our component.
  constructor(private route: ActivatedRoute,
              private menuService: MenuService,
              private menuCategoryService: MenuCategoryService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {

    this.route.params.forEach((params: Params) => {
      if (params['name']) {//TODO change name to id
        this.getMenu(params['name']);//TODO change name to id
        this.create = false;
      } else {
        this.menu = new Menu('',[]);
        this.create = true;
      }
    });
    this.getCategories();
  }

  getMenu(name: string): void {//TODO id: number
    this.menuService.getMenu(name).subscribe(//TODO id: number
      menu => {
        this.menu = menu;
        //this.getCategories();
        if(!(menu.categories)) {
          this.menu.categories = [];
        }
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

   getCategories(): void {
     this.categoryService.getCategories().subscribe(
       categories => {
         this.categoriesInDb = categories;
         this.availableCategories = [];
         for(let i = 0; i < categories.length; i++) {
           this.availableCategories.push(categories[i]);
         }

         if (this.menu.categories.length !== 0) {
           for(let i = 0; i < this.availableCategories.length; i++) {
             if(this.menu.categories[i].id === this.availableCategories[i].id) {
               this.availableCategories.splice(i, 1);
             }
           }
         }

         this.menuCatUndefinedYet = false;
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
    // 1. clean the database for menuCategory model
    for(let i = 0; i < this.categoriesInDb.length; i++) {
     this.menuCategoryService.deleteMenuCategory(this.menu.id, this.categoriesInDb[i].id);
    }

    // 2. add new user selected categories (menu.categories) into the database
    // The order is the order of the index i of menu.categories
    for(let i = 0; i < this.menu.categories.length; i++) {
      this.menuCategoryService.addMenuCategory(this.menu.id, this.menu.categories[i].id, i);
    }
  }

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

  addCatClick(event: Event, catid: number): void {
    if(catid) {
      event.preventDefault();
      if(!(this.create)) {
        for(let i = 0; i < this.availableCategories.length; i++) {
          if(this.availableCategories[i].id === catid) {
            this.menu.categories.push(this.availableCategories[i]);
            this.availableCategories.splice(i,1);
          }
        }
      }
    }
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

  deleteCatClick(event: Event, catid: number): void {
    if(catid) {
      event.preventDefault();
      if(!(this.create)) {
        for(let i = 0; i < this.menu.categories.length; i++) {
          if(this.menu.categories[i].id === catid) {
            this.availableCategories.push(this.menu.categories[i]);
            this.menu.categories.splice(i,1);
          }
        }
      }
    }
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


