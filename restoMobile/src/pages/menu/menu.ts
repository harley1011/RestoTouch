import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from "ionic-native";
import { Category } from '../shared/models/category';
import { Item } from '../shared/models/items';
import { Size } from '../shared/models/size';
import { IngredientGroup } from '../shared/models/ingredient-group';
import { OrderableCategory, OrderableItem, OrderableSize } from './orderable-category';
import { Order } from '../shared/models/order';
import { SelectedIngredients } from '../shared/models/selected-ingredients';
import { Menu } from '../shared/models/menu';
import { CategoryService } from '../services/category.service';
import { ItemService } from '../services/item.service';
import { MenuService } from '../services/menu.service';
import { FoodListPage } from '../food-list/food-list';
import { IngredientGroupPage } from '../ingredient-group/ingredient-group';
import { OrderService } from '../services/order.service';
import { WelcomePage } from '../welcome/welcome';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  selectedMenu: any;
  selectedLanguage: any;
  selectedRestaurant: any;
  menu: Menu;
  categories: Array<OrderableCategory>;
  total: string;

  currentOrder = new Order([], 0, 'notPaid', '');
  showAllCategories: boolean;
  currentCategory: Category;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private categoryService: CategoryService,
              private orderService: OrderService,
              private itemService: ItemService,
              private menuService: MenuService,
              private platform: Platform) {

    this.selectedMenu = navParams.get('menu');
    this.selectedLanguage = navParams.get('language');
    this.selectedRestaurant = navParams.get('restaurant');
    this.categories = [];
    this.total = "0.00";
    this.showAllCategories = true;

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
              var size: Size;
              for (var j = 0; j < item.sizes.length; j++) {
                size = item.sizes[j];
                size.selectedTranslation = size.translations.find(translation => translation.languageCode == this.selectedLanguage.languageCode);
              }

              var group: IngredientGroup;
              for (var j = 0; j < item.ingredientGroups.length; j++) {
                group = item.ingredientGroups[j];
                group.selectedTranslation = group.translations.find(translation => translation.languageCode == this.selectedLanguage.languageCode);
              }
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
        item.ingredientGroups.sort(compareIngredientGroup);
      });
      self.categories.push(orderableCategory);
    });
  }

  addOrder(orderableCategory: OrderableCategory, orderableItem: OrderableItem, orderableSize: OrderableSize): void {
    if (orderableItem.item.ingredientGroups.length > 0) {
      this.addComplexOrder(orderableItem, orderableSize);
    } else {
      this.addSimpleOrder(orderableItem, orderableSize);
    }
  }

  removeOrder(orderableCategory: OrderableCategory, orderableItem: OrderableItem, orderableSize: OrderableSize): void {
    orderableSize.count = orderableSize.count > 0 ? orderableSize.count - 1 : 0;

    this.currentOrder.removeOrder(orderableItem.item, orderableSize.size, null);
  }

  addSimpleOrder(orderableItem: OrderableItem, orderableSize: OrderableSize): void {
    orderableSize.count++;

    this.currentOrder.addOrder(orderableItem.item, orderableSize.size, null, 0);
  }

  addComplexOrder(orderableItem: OrderableItem, orderableSize: OrderableSize): void {
    var self = this;
    var getComplexOrder = function(selectedIngredients: SelectedIngredients, price: number) {
      return new Promise((resolve, reject) => {
        orderableSize.count++;

        self.currentOrder.addOrder(orderableItem.item, orderableSize.size, selectedIngredients, price);

        resolve();
      });
    };

    this.navCtrl.push(IngredientGroupPage, {
      item: orderableItem.item,
      ingredientGroupIndex: 0,
      language: this.selectedLanguage,
      callback: getComplexOrder,
      ingredients: new SelectedIngredients([]),
      modify: false,
      total: 0
    }, {
      animate: true,
      animation: "md-transition",
      direction: "forward"
    });
  }

  orderList(): void {
    var self = this;
    var orderListCallback = function (order: Order, removeList: Array<any>) {
      return new Promise((resolve, reject) => {
        self.currentOrder = order

        let orderableSize: OrderableSize;
        self.categories.forEach(orderableCategory => {
          orderableCategory.items.forEach(orderableItem => {
            removeList.forEach(removedItem => {
              if (removedItem.item.id === orderableItem.item.id) {
                orderableItem.sizes.forEach(orderableSize => {
                  if (orderableSize.size.id === removedItem.size.id) {
                    orderableSize.count--;
                  }
                });
              }
            });
          });
        });

        resolve();
      });
    }

    this.navCtrl.push(FoodListPage, {
      order: this.currentOrder,
      language: this.selectedLanguage,
      callback: orderListCallback
    }, {
      animate: true,
      animation: "md-transition",
      direction: "forward"
    });
  }

  order(): void {
    var payFirst = true;
    if (payFirst && this.platform.is('cordova')) {
      this.usePayPal();
    } else {
      this.orderService.placeOrder(this.currentOrder).subscribe(response=> {
        this.navCtrl.setRoot(WelcomePage);
      });
    }
  }

  usePayPal(): void {
    var self = this;
    PayPal.init({
      "PayPalEnvironmentProduction": this.selectedRestaurant.paypalId,
      "PayPalEnvironmentSandbox": "AaSdrzWXMJWXl_fxul1Q6KstQTlUgEfs7gmJ2qwrAPscdTUleVbZTEwj7NZIpZYYSy0xDzPCC4_zLgn3"
    }).then(() => {
      PayPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(
        () => {
          let payment = new PayPalPayment(self.currentOrder.total.toString(), 'CAD', 'Pay Order', 'sale');
          PayPal.renderSinglePaymentUI(payment).then(
            (response) => {
              self.currentOrder.paymentId = response.response.id;
              self.orderService.placeOrder(self.currentOrder).subscribe(response=> {
                self.navCtrl.setRoot(WelcomePage);
              });
            }, () => {

            }
          );
        }, () => {

        });
    }, () => {

    });
  }

    changeGroup(name: string, category: Category): void {
     if(name == 'all') {
        this.showAllCategories = true;
      } else {
          this.showAllCategories = false;
          this.currentCategory = category;
          this.currentCategory.items = category.items;
      }
    }
}

function compareIngredientGroup (group1: IngredientGroup, group2: IngredientGroup) {
  if (group1.orderPriority < group2.orderPriority) {
    return -1;
  } else if (group1.orderPriority > group2.orderPriority) {
    return 1;
  } else {
  	return 0;
  }
}
