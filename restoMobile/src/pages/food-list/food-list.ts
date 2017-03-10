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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit(): void {
    this.selectedLanguage = this.navParams.get('language');
    this.order = this.navParams.get('order');

    this.initFoodList();
  }

  initFoodList(): void {
    this.foodList = [];

    console.log(this.order);
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

  cancel(): void {
    this.navCtrl.pop({
      animate: true,
      animation: "md-transition",
      direction: 'back'
    });
  }
}
