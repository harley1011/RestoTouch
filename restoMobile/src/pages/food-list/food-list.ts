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
    this.order.removeFromOrder(item, size.size, size.selectedIngredients);

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
