import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Order } from '../shared/models/order';
import { Item } from '../shared/models/items';
import { Size } from '../shared/models/size';
import { IngredientGroup } from '../shared/models/ingredient-group';

@Component({
  selector: 'page-food-list',
  templateUrl: 'food-list.html'
})
export class FoodListPage implements OnInit {
  selectedLanguage: any;
  order: Order;
  foodList: Array<any>;
  removeList: Array<any>;
  foodListCallback: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit(): void {
    this.selectedLanguage = this.navParams.get('language');
    this.order = this.navParams.get('order');
    this.foodListCallback = this.navParams.get('callback');
    this.removeList = [];

    this.initFoodList();
  }

  initFoodList(): void {
    this.foodList = [];

    var self = this;
    this.order.orderedItems.forEach(orderedItem => {
      orderedItem.sizes.forEach(size => {
        self.foodList.push({
          item: orderedItem.item,
          size: size
        });
      });
    });
  }

  remove(item: Item, size: any): void {
    this.removeList.push({
      item: item,
      size: size.size
    });
    this.removeFromList(item, size);
    this.removeFromOrder(item, size);

    if (this.foodList.length == 0) this.back();
  }

  removeFromList(item: Item, size: any): void {
    let foodItem: any;
    for (var i = 0; i < this.foodList.length; i++) {
      foodItem = this.foodList[i];
      if (item.id === foodItem.item.id && size.size.id === foodItem.size.size.id && (size.selectedIngredients == null ||
        size.selectedIngredients === foodItem.size.selectedIngredients)) {
          this.foodList.splice(i, 1);
          break;
      }
    }
  }

  removeFromOrder(item: Item, size: any): void {
    let orderedItem: any;
    let orderedSize: any;
    for (var i = 0; i < this.order.orderedItems.length; i++) {
      orderedItem = this.order.orderedItems[i];
      if (orderedItem.item != item) continue;

      for (var j = 0; j < orderedItem.sizes.length; j++) {
        orderedSize = orderedItem.sizes[j];
        if (size.size.id === orderedSize.size.id && (size.selectedIngredients == null ||
          size.selectedIngredients === orderedSize.selectedIngredients)) {
          orderedItem.sizes.splice(j, 1);
          break;
        }
      }

      if (orderedItem.sizes.length == 0) {
        this.order.orderedItems.splice(i, 1);
      }
      break;
    }

    this.order.total -= orderedSize.size.price;
    if (orderedSize.selectedIngredients == null) return;

    let ingredient: any;
    for (var i = 0; i < orderedSize.selectedIngredients.ingredients.length; i++) {
      ingredient = orderedSize.selectedIngredients.ingredients[i];
      this.order.total -= (ingredient.quantity * ingredient.ingredient.price);
    }
  }

  back(): void {
    this.foodListCallback(this.order, this.removeList).then(() => {
      this.navCtrl.pop({
        animate: true,
        animation: "md-transition",
        direction: 'back'
      });
    });
  }
}
