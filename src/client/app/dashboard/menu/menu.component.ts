import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'menu-cmp',
	templateUrl: 'menu.component.html',
	styleUrls: ['menu.css']
})

export class MenuComponent implements OnInit {
	create: boolean;
  errorMessage: string;

	constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			if (params['name']) {
				this.create = false;
			} else {
				this.create = true;
			}
		});
  }
}
