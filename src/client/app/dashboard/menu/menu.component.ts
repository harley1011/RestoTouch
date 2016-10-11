import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MenuService} from './menu.service';
import {Menu} from './menu';

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
  errorMessage: string;

	constructor(private route: ActivatedRoute, private menuService: MenuService, private router: Router) {}

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

  addAndUpdate(): void {
    var values = validateInputs();
    if (values === null) return;

    var givenName = this.menu.name;
    this.menu.name = values['name'];

    if (this.create) {
      this.add();
    } else {
      this.update(givenName);
    }
  }

  add(): void {
    this.menuService.addMenu(this.menu).subscribe(
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
  }

  cancel(): void {
    this.router.navigate(['/dashboard/menulist']);
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
