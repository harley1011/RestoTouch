import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Menu } from '../menu/menu';

@Component({
	moduleId: module.id,
	selector: 'menulist-cmp',
	templateUrl: 'menulist.component.html',
	styleUrls: ['menulist.css']
})

export class MenuListComponent implements OnInit {
	numOfMenus: number;
	menus: Menu[];

  constructor(private router: Router) { }

	getMenus(): void {
		this.menus = [
			new Menu('Menu 1'),
			new Menu('Menu 2'),
			new Menu('Menu 3')
		];
		this.numOfMenus = this.menus.length;
	};

  ngOnInit(): void {
    this.getMenus();
  }

	add(): void {
		this.router.navigate(['/dashboard/menu']);
	}

	modify(menu: Menu): void {
		this.router.navigate(['/dashboard/menu', menu.name]);
	}
}
