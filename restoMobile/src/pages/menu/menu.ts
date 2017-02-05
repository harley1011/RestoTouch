import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Item } from '../shared/models/items';
import { OrderableCategory, OrderableItem, OrderableSize } from './orderable-category';
import { Order } from '../shared/models/order';
import { Menu } from '../shared/models/menu';
import { OrderService } from '../services/order.service';
import { ItemService } from '../services/item.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  selectedMenu: any;
  selectedLanguage: any;
  menu: Menu;
  categories: Array<OrderableCategory>;
  total: string;
  currentOrder = new Order([], 0);

  constructor(public navParams: NavParams,
              private orderService: OrderService,
              private menuService: MenuService) {

    this.selectedMenu = navParams.get('menu');
    this.selectedLanguage = navParams.get('language');
    this.categories = [];
    this.total = "0.00";

    this.getMenu(this.selectedMenu.id);
  }

  isItemDisabled(targetItem, category): boolean {
    for (let item of this.menu.disabledCategoryItems) {
      if (item.itemId === targetItem.id && item.categoryId === category.id) {
        return true;
      }
    }
    return false;
  }

  getMenu(id: number): void {
    this.menuService.getMenu(id).subscribe(
      menu => {
        this.menu = menu;
        this.menu.categories.forEach(category => {
          category.selectedTranslation = category.translations.find(translation => translation.languageCode == this.selectedLanguage.languageCode);
          var item: Item;
          for (var i = 0; i < category.items.length; i++) {
            item = category.items[i];
            if (this.isItemDisabled(item, category)) {
              category.items.splice(i--, 1);
            } else {
              item.selectedTranslation = item.translations.find(translation => translation.languageCode == this.selectedLanguage.languageCode);
            }
          }
        });

        this.initOrderableCategories();
      },
      error => {
        console.log(error);
      }
    );
  }

  initOrderableCategories(): void {
    var self = this;
    let orderableCategory: OrderableCategory;
    let orderableItem: OrderableItem;
    let orderableSize: OrderableSize;
    this.menu.categories.forEach(category => {
      orderableCategory = new OrderableCategory(category, []);
      category.items.forEach(item => {
        orderableItem = new OrderableItem(item, []);
        item.sizes.forEach(size => {
          orderableSize = new OrderableSize(size, 0);
          orderableItem.sizes.push(orderableSize);
        });
        orderableCategory.items.push(orderableItem);
      });
      self.categories.push(orderableCategory);
    });
  }

  addOrder(orderableCategory: OrderableCategory, orderableItem: OrderableItem, orderableSize: OrderableSize): void {
    orderableSize.count++;

    var item = orderableItem.item;
    var size = orderableSize.size;

    let foundItem = this.currentOrder.orderedItems.find((currentItem: any) => currentItem.item.id == item.id);
    if (foundItem) {
      let foundSize = foundItem.sizes.find((currentSize: any) => currentSize.size.id == size.id);
      if (foundSize) {
        foundSize.quantity++;
      }
      else {
        foundItem.sizes.push({size: size, quantity: 1});
      }
    } else {
      this.currentOrder.orderedItems.push({item: item, sizes: [{size: size, quantity: 1}], ingredients: []});
    }

    this.currentOrder.total += size.price;
  }

  removeOrder(orderableCategory: OrderableCategory, orderableItem: OrderableItem, orderableSize: OrderableSize): void {
    orderableSize.count = orderableSize.count > 0 ? orderableSize.count - 1 : 0;

    let foundItem = this.currentOrder.orderedItems.find((currentItem: any) => currentItem.item.id == orderableItem.item.id);
    let foundSize = foundItem.sizes.find((currentSize: any) => currentSize.size.id == orderableSize.size.id);
    foundSize.quantity--;
    this.currentOrder.total -= orderableSize.size.price;
  }

  order(): void {
    this.orderService.placeOrder(this.currentOrder).subscribe(response=> {
      console.log(response);
    });
  }
}
