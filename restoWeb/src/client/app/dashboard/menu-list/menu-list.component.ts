import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Menu} from '../../../../../../restoCommon/shared/models/menu';
import {Language} from '../../../../../../restoCommon/shared/models/language';
import {MenuService} from '../menu/menu.service';

import {Restaurant} from '../../../../../../restoCommon/shared/models/restaurant';
import {RestaurantService} from '../restaurant/restaurant.service';
import {MenuListService} from './menu-list.service';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';
@Component({
  moduleId: module.id,
  selector: 'menu-list-cmp',
  templateUrl: 'menu-list.component.html',
  providers: [MenuService, RestaurantService, MenuListService]
})

export class MenuListComponent implements OnInit {
  numOfMenus: number;
  restaurant: Restaurant;
  menus: Menu[];
  menusInRestaurant: boolean[];
  updates: {menuId: number, type: string}[];

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

  constructor(private route: ActivatedRoute, private menuService: MenuService,
              private router: Router, private restaurantService: RestaurantService,
              private menuListService: MenuListService) {
  }

  getMenus(): void {
    this.menuService.getMenus().subscribe(
      menus => {
        this.menus = menus;
        menus.forEach(menu => {
          menu.selectedTranslation = menu.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
        });
        this.numOfMenus = this.menus.length;
        this.menusInRestaurant = new Array(this.menus.length);

        if (this.restaurant === undefined)
          return;

        this.numOfMenus = 0;
        this.updates = [];

        for (var i = 0; i < this.menus.length; i++) {
          this.menusInRestaurant[i] = false;
          for (var j = 0; j < this.restaurant.Menus.length; j++) {
            if (this.menus[i].id === this.restaurant.Menus[j].id) {
              this.menusInRestaurant[i] = true;
              this.numOfMenus++;
              break;
            }
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  };

  onSelectLanguage(language: Language) {
    this.menus.forEach(menus => {
      menus.selectedTranslation = menus.translations.find(translation => translation.languageCode === language.languageCode);
    });
  }

  getRestaurant(id: number): void {
    this.restaurantService.getRestaurant(id).subscribe(
      restaurant => {
        this.restaurant = restaurant;
        this.getMenus();
      }
    );
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.getRestaurant(params['id']);
      }
    });
    this.getMenus();
  }

  add(): void {
    this.router.navigate(['/dashboard/menu']);
  }

  updateRestaurantMenu(): void {
    if (this.updates === undefined)
      return;

    for (var i = 0; i < this.updates.length; i++) {
      if (this.updates[i].type === 'add') {
        this.menuListService.addRestaurantMenu(this.updates[i].menuId, this.restaurant.id)
          .subscribe(
            null,
            error => {
              console.log(error);
            }
          );
      } else if (this.updates[i].type === 'remove') {
        this.menuListService.deleteRestaurantMenu(this.updates[i].menuId, this.restaurant.id)
          .subscribe(
            null,
            error => {
              console.log(error);
            }
          );
      }
    }

    console.log(this.restaurant);
    this.router.navigate(['/dashboard/restaurant', this.restaurant.id]);
  }

  modify(index: number, menu: Menu): void {
    if (this.restaurant !== undefined) {
      var inRestaurant = this.menusInRestaurant[index];
      this.numOfMenus = (inRestaurant) ? this.numOfMenus - 1 : this.numOfMenus + 1;
      this.menusInRestaurant[index] = !inRestaurant;
      this.modifyUpdates(menu, this.menusInRestaurant[index]);
    } else {
      this.router.navigate(['/dashboard/menu', menu.id]);
    }
  }

  cancel(): void {
    if (this.restaurant !== undefined) {
      this.router.navigate(['/dashboard/restaurant', this.restaurant.id]);
    }
  }

  private modifyUpdates(menu: Menu, inRestaurant: boolean): void {
    var type = (inRestaurant) ? 'add' : 'remove';
    for (var i = 0; i < this.updates.length; i++) {
      if (this.updates[i].menuId === menu.id) {
        this.updates[i].type = type;
        return;
      }
    }

    this.updates.push({
      menuId: menu.id,
      type: type
    });
  }
}
