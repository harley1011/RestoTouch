import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Order } from '../shared/models/order';
import { Item } from '../shared/models/items';
import { Size } from '../shared/models/size';
import { SelectedIngredients } from '../shared/models/selected-ingredients';
import { IngredientGroup } from '../shared/models/ingredient-group';
import { IngredientGroupPage } from '../ingredient-group/ingredient-group';

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

  modify(item: Item, size: any): void {
    var oldPrice = 0;
    if (size.selectedIngredients != null) {
      let ingredient: any;
      for (var i = 0; i < size.selectedIngredients.ingredients.length; i++) {
        ingredient = size.selectedIngredients.ingredients[i];
        oldPrice += ingredient.quantity * ingredient.ingredient.price;
      }
    }

    var self = this;
    var getComplexOrder = function(selectedIngredients: SelectedIngredients, price: number) {
      return new Promise((resolve, reject) => {
        self.order.modifyOrder(oldPrice, price);

        resolve();
      });
    };

    this.navCtrl.push(IngredientGroupPage, {
      item: item,
      ingredientGroupIndex: 0,
      language: this.selectedLanguage,
      callback: getComplexOrder,
      ingredients: size.selectedIngredients,
      modify: true,
      total: oldPrice
    }, {
      animate: true,
      animation: "md-transition",
      direction: "forward"
    });
  }

  remove(item: Item, size: any): void {
    this.removeList.push({
      item: item,
      size: size.size
    });
    this.removeFromList(item, size);
    this.order.removeOrder(item, size.size, size.selectedIngredients);

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
