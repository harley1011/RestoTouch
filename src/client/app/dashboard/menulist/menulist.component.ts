import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Menu } from '../menu/menu';
import { MenuService } from '../menu/menu.service';

@Component({
	moduleId: module.id,
	selector: 'menulist-cmp',
	templateUrl: 'menulist.component.html',
	styleUrls: ['menulist.css'],
  providers: [MenuService]
})

export class MenuListComponent implements OnInit {
	numOfMenus: number;
	menus: Menu[];

  constructor(private menuService: MenuService, private router: Router) { }

	getMenus(): void {
		this.menuService.getMenus().subscribe(
			menus => {
				this.menus = menus;
				this.numOfMenus = this.menus.length;
			},
			error =>  {
				console.log(error);
			}
		);
	};

  ngOnInit(): void {
    this.getMenus();
  }

	/*add(): void {
		var menu = new Menu(randomName());
		this.menuService.addMenu(menu)
			.subscribe(
				generalResponse => {
					this.router.navigate(['/dashboard/menulist']);
				},
				error => {
					console.log(error);
				}
		);
	}*/

	add(): void {
		this.router.navigate(['/dashboard/menu']);
	}

	modify(menu: Menu): void {
		this.router.navigate(['/dashboard/menu', menu.name]);
	}
}

/*function randomName () {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for(var i = 0; i < 5; i++)
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}*/
