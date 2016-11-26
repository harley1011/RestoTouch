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
    // TODO Don't i have to check if there is categories or not ??
      this.getCategories();
  }

  getMenu(name: string): void {//TODO id: number
    this.menuService.getMenu(name).subscribe(//TODO id: number
      menu => {
        this.menu = menu;
        console.log(menu);//TODO------------------- for some reason the categories are not stored..
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }
   getCategories(): void {
     this.categoryService.getCategories().subscribe(
       categories => {

         for (let i = 0; i < categories.length; i++) {
           for (let j = 0; j < this.menu.categories.length; j++) {
             if(categories[i] === this.menu.categories[j]) {
               //Do nothing; don't push
             }
             this.availableCategories.push(categories[i]);
           }
         }
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
      if(this.create = false) {
        this.menuCategoryService.addMenuCategory(this.menu.id, catid);//, order);//TODO
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

  deleteCatClick(event: Event, menuid: number, catid: number): void {
    if(catid && menuid) {
      event.preventDefault();
      this.menuCategoryService.deleteMenuCategory(menuid, catid);
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


