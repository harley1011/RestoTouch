import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Menu } from '../menu/menu';
import { MenuService } from '../menu/menu.service';

import { Restaurant } from '../home/restaurantlist/restaurant';
import { RestaurantService } from '../restaurant/restaurant.service';

@Component({
	moduleId: module.id,
	selector: 'menulist-cmp',
	templateUrl: 'menulist.component.html',
	styleUrls: ['menulist.css'],
  providers: [MenuService, RestaurantService]
})

export class MenuListComponent implements OnInit {
	numOfMenus: number;
	restaurant: Restaurant;
	menus: Menu[];
	menusInRestaurant: boolean[];

  constructor(private route: ActivatedRoute, private menuService: MenuService,
		private router: Router, private restaurantService: RestaurantService) { }

	getMenus(): void {
		this.menuService.getMenus().subscribe(
			menus => {
				this.menus = menus;
				this.numOfMenus = this.menus.length;
				this.menusInRestaurant = new Array(this.menus.length);

				if (this.restaurant === undefined)
					return;

				for (var i = 0; i < this.menus.length; i++) {
					this.menusInRestaurant[i] = false;
					for (var j = 0; j < this.restaurant.Menus.length; j++) {
						if (this.menus[i].name === this.restaurant.Menus[j].name) {
							this.menusInRestaurant[i] = true;
							break;
						}
					}
				}
			},
			error =>  {
				console.log(error);
			}
		);
	};

	getRestaurant(name: string): void {
		this.restaurantService.getRestaurant(name).subscribe(
			restaurant => {
				this.restaurant = restaurant;
			}
		);
	}

  ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			if (params['name']) {
				this.getRestaurant(params['name']);
			}
		});
    this.getMenus();
  }

	add(): void {
		this.router.navigate(['/dashboard/menu']);
	}

	modify(event: MouseEvent, index: number, menu: Menu): void {
		if (this.restaurant !== undefined) {
			this.menusInRestaurant[index] = !this.menusInRestaurant[index];
		} else {
			this.router.navigate(['/dashboard/menu', menu.name]);
		}
	}
}
