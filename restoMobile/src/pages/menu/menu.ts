import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Category } from '../shared/models/category';
import { Item } from '../shared/models/items';
import { Size } from '../shared/models/size';
import { Menu } from '../shared/models/menu';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
 selectedMenu: any;
 menu: Menu;
 items: Array <Item>;



  constructor(public navCtrl: NavController, public navParams: NavParams,
              private categoryService: CategoryService,
              private itemService: ItemService,
              private menuService: MenuService) {

    this.selectedMenu = navParams.get('menu');
    this.getMenu(this.selectedMenu.id);
  }

  isItemDisabled(targetItem, category): boolean {
    for(let item of this.menu.disabledCategoryItems) {
      if(item.itemId === targetItem.id  && item.categoryId === category.id) {
        return true;
      }
    }
    return false;
  }

  getMenu(id: number): void {
        this.menuService.getMenu(id).subscribe(
            menu => {
                this.menu = menu;

                this.menu.categories.forEach( category => {
                    category.selectedTranslation = category.translations.find(translation => translation.languageCode == 'en');

                    category.items.forEach( item => {
                      item.selectedTranslation = item.translations.find(translation => translation.languageCode == 'en');

                  });
                });
            },
            error => {
                console.log(error);
            }
        );
  }
}
