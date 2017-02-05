import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Item } from '../shared/models/items';
import { IngredientGroup } from '../shared/models/ingredient-group';
import { Ingredient } from '../shared/models/ingredient';
import { OrderIngredients } from '../shared/models/order-ingredients';
import { OrderableIngredient } from './orderable-ingredient';

@Component({
  selector: 'page-ingredient-group',
  templateUrl: 'ingredient-group.html'
})
export class IngredientGroupPage implements OnInit {
  selectedLanguage: any;
  item: Item;
  ingredientGroup: IngredientGroup;
  ingredientGroupIndex: number;
  complexOrderCallback: any;
  orderableIngredients: Array<OrderableIngredient>;
  orderAllIngredients: Array<OrderIngredients>;
  orderGroupIngredients: Array<OrderIngredients>;
  total: number;
  totalStr: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit(): void {
    this.selectedLanguage = this.navParams.get('language');
    this.item = this.navParams.get('item');
    this.ingredientGroupIndex = this.navParams.get('ingredientGroupIndex');

    this.ingredientGroup = this.item.ingredientGroups[this.ingredientGroupIndex];
    this.ingredientGroup.selectedTranslation = this.ingredientGroup.translations.find(translation => translation.languageCode == this.selectedLanguage.languageCode);
    /*this.ingredientGroup.ingredients.forEach(ingredient => {
      ingredient.selectedTranslation = ingredient.translations.find(translation => translation.languageCode == this.selectedLanguage.languageCode);
    });*/

    this.complexOrderCallback = this.navParams.get('callback');
    this.orderAllIngredients = this.navParams.get('ingredients');
    this.orderGroupIngredients = [];
    this.total = this.navParams.get('total');
    this.totalStr = this.total.toFixed(2);

    this.initOrderableIngredients();
  }

  initOrderableIngredients(): void {
    this.orderableIngredients = [];

    let ingredient: Ingredient;
    let orderableIngredient: OrderableIngredient;
    for (var i = 0; i < this.ingredientGroup.ingredients.length; i++) {
      ingredient = this.ingredientGroup.ingredients[i];
      if (ingredient.addByDefault) {
        orderableIngredient = new OrderableIngredient(ingredient, false, 1);
        this.orderGroupIngredients.push(
          new OrderIngredients(this.ingredientGroup.id, ingredient.id)
        );
        this.total += ingredient.price;
        this.totalStr = this.total.toFixed(2);
      } else {
        orderableIngredient = new OrderableIngredient(ingredient, false, 0);
      }
      this.orderableIngredients.push(orderableIngredient);
    }

    // check if need to disable
    if (this.ingredientGroup.maxNumberOfIngredients == this.orderGroupIngredients.length) {
      this.disableIngredients();
    }
  }

  previousIngredientGroup(): void {
    var opts = {
      animate: true,
      animation: "ios-transition"
    };

    if (this.ingredientGroupIndex == 0) {
      opts['direction'] = 'back';
      opts['animation'] = 'md-transition';
    } else {
      opts['direction'] = 'back';
    }

    this.navCtrl.pop(opts);
  }

  nextIngredientGroup(): void {
    var index = this.ingredientGroupIndex + 1;

    if (index >= this.item.ingredientGroups.length) {
      this.doneIngredientOrder();
    } else {
      this.nextIngredientOrder();
    }
  }

  nextIngredientOrder(): void {
    this.orderAllIngredients = this.orderAllIngredients.concat(this.orderGroupIngredients);

    var index = this.ingredientGroupIndex + 1;
    this.navCtrl.push(IngredientGroupPage, {
      item: this.item,
      ingredientGroupIndex: index,
      language: this.selectedLanguage,
      callback: this.complexOrderCallback,
      ingredients: this.orderAllIngredients,
      total: this.total
    }, {
      animate: true,
      animation: "ios-transition"
    });
  }

  doneIngredientOrder(): void {
    this.orderAllIngredients = this.orderAllIngredients.concat(this.orderGroupIngredients);

    this.complexOrderCallback(this.orderAllIngredients, this.total).then(() => {
      var index = this.ingredientGroupIndex + 1;
      var startIndex = this.navCtrl.indexOf(this.navCtrl.last()) - (this.ingredientGroupIndex);
      this.navCtrl.remove(startIndex, index, {
        animate: true,
        animation: "md-transition"
      });
    });
  }

  selectIngredient(orderableIngredient: OrderableIngredient): void {
    if (orderableIngredient.amount == 0) {
      this.addIngredient(orderableIngredient);
    } else {
      this.removeIngredient(orderableIngredient, true);
    }
  }

  addIngredient(orderableIngredient: OrderableIngredient): void {
    orderableIngredient.amount++;
    this.total += orderableIngredient.ingredient.price;
    this.totalStr = this.total.toFixed(2);

    this.orderGroupIngredients.push(
      new OrderIngredients(this.ingredientGroup.id, orderableIngredient.ingredient.id)
    );

    // check if need to disable
    if (this.ingredientGroup.maxNumberOfIngredients == this.orderGroupIngredients.length) {
      this.disableIngredients();
    }
  }

  removeIngredient(orderableIngredient: OrderableIngredient, fromCheckbox: boolean): void {
    if (fromCheckbox) {
      this.total -= (orderableIngredient.amount * orderableIngredient.ingredient.price);
      this.totalStr = this.total.toFixed(2);
      orderableIngredient.amount -= orderableIngredient.amount;
    } else {
      orderableIngredient.amount--;
      this.total -= orderableIngredient.ingredient.price;
      this.totalStr = this.total.toFixed(2);
    }

    // check if should enable
    if (this.ingredientGroup.maxNumberOfIngredients == this.orderGroupIngredients.length) {
      let otherOrderableIngredient: OrderableIngredient;
      for (var i = 0; i < this.orderableIngredients.length; i++) {
        otherOrderableIngredient = this.orderableIngredients[i];
        otherOrderableIngredient.disabled = false;
      }
    }

    let orderIngredient: OrderIngredients;
    for (var i = 0; i < this.orderGroupIngredients.length; i++) {
      orderIngredient = this.orderGroupIngredients[i];
      if (orderIngredient.ingredientId == orderableIngredient.ingredient.id) {
        this.orderGroupIngredients.splice(i--, 1);

        if (orderableIngredient.amount > 0) break;
      }
    }
  }

  disableIngredients(): void {
    let otherOrderableIngredient: OrderableIngredient;
    for (var i = 0; i < this.orderableIngredients.length; i++) {
      otherOrderableIngredient = this.orderableIngredients[i];
      if (otherOrderableIngredient.amount != 1 || otherOrderableIngredient.ingredient.allowQuantity != 1) {
        otherOrderableIngredient.disabled = true;
      }
    }
  }
}
