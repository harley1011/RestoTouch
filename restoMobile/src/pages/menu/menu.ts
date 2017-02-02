import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Category } from '../shared/models/category';
import { Item } from '../shared/models/items';
import { Size } from '../shared/models/size';
import { OrderableCategory, OrderableItem, OrderableSize } from './orderable-category';
import { Order } from '../shared/models/order';
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
  selectedLanguage: any;
  menu: Menu;
  categories: Array<OrderableCategory>;
  orders: Array<Order>;
  total: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private categoryService: CategoryService,
              private itemService: ItemService,
              private menuService: MenuService) {

    this.selectedMenu = navParams.get('menu');
    this.selectedLanguage = navParams.get('language');
    this.categories = [];
    this.orders = [];
    this.total = "0.00";

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

    console.log(orderableItem);

    var item = orderableItem.item;
    var size = orderableSize.size;
    var order = new Order(item.id, size.id, []);
    this.orders.push(order);

    var total = parseFloat(this.total);
    total += size.price;
    this.total = total.toFixed(2);
  }

  removeOrder(orderableCategory: OrderableCategory, orderableItem: OrderableItem, orderableSize: OrderableSize): void {
    orderableSize.count = orderableSize.count > 0 ? orderableSize.count-1 : 0;

    var item = orderableItem.item;
    var size = orderableSize.size;
    let order: Order;
    for (var i = 0; i < this.orders.length; i++) {
      order = this.orders[i];
      if (order.itemId === item.id && order.sizeId === size.id) {
        this.orders.splice(i, 1);

        var total = parseFloat(this.total);
        total -= size.price;
        if (total < 0) total = 0;
        this.total = total.toFixed(2);

        break;
      }
    }
  }

  order(): void {
    console.log('ORDER');
  }
}
