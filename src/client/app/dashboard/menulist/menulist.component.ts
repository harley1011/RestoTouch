import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'menulist-cmp',
	templateUrl: 'menulist.component.html',
	styleUrls: ['menulist.css']
})

export class MenuListComponent implements OnInit {

  constructor(private router: Router) { }

	getMenus(): void {
		console.log('Get Menus');
	};

  ngOnInit(): void {
    this.getMenus();
  }
}
