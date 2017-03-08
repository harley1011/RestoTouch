import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Item } from '../shared/models/items';
import { IngredientGroup } from '../shared/models/ingredient-group';
import { Ingredient } from '../shared/models/ingredient';
import { SelectedIngredients } from '../shared/models/selected-ingredients';
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
  selectedIngredients: SelectedIngredients;
  ingredientCount: number;
  total: number;
  totalStr: string;
  currentIngredientGroup: IngredientGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit(): void {
    this.selectedLanguage = this.navParams.get('language');
    this.item = this.navParams.get('item');
    this.ingredientGroupIndex = this.navParams.get('ingredientGroupIndex');

    this.ingredientGroup = this.item.ingredientGroups[this.ingredientGroupIndex];
    this.ingredientGroup.selectedTranslation = this.ingredientGroup.translations.find(translation => translation.languageCode == this.selectedLanguage.languageCode);

    this.complexOrderCallback = this.navParams.get('callback');
    this.selectedIngredients = this.navParams.get('ingredients');
    this.ingredientCount = 0;
    this.total = this.navParams.get('total');
    this.totalStr = this.total.toFixed(2);

    this.initOrderableIngredients();
    console.log("welcome to complex item");
    console.log(this.item);
  }

  initOrderableIngredients(): void {
    this.orderableIngredients = [];

    let ingredient: Ingredient;
    let orderableIngredient: OrderableIngredient;
    for (var i = 0; i < this.ingredientGroup.ingredients.length; i++) {
      ingredient = this.ingredientGroup.ingredients[i];
      if (ingredient.addByDefault) {
        orderableIngredient = new OrderableIngredient(ingredient, false, 1);
        this.selectedIngredients.ingredients.push(
          {ingredientGroup: this.ingredientGroup, ingredient: ingredient, quantity: 1}
        );
        this.ingredientCount++;
        this.total += ingredient.price;
        this.totalStr = this.total.toFixed(2);
      } else {
        orderableIngredient = new OrderableIngredient(ingredient, false, 0);
      }
      this.orderableIngredients.push(orderableIngredient);
    }

    // check if need to disable
    if (this.ingredientGroup.maxNumberOfIngredients == this.ingredientCount) {
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

    var index = this.ingredientGroupIndex + 1;
    this.navCtrl.push(IngredientGroupPage, {
      item: this.item,
      ingredientGroupIndex: index,
      language: this.selectedLanguage,
      callback: this.complexOrderCallback,
      ingredients: this.selectedIngredients,
      total: this.total
    }, {
      animate: true,
      animation: "ios-transition"
    });
  }

  doneIngredientOrder(): void {
    this.complexOrderCallback(this.selectedIngredients, this.total).then(() => {
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

    let foundIngredient = this.selectedIngredients.ingredients.find((currentIngredient: any) => currentIngredient.ingredient.id == orderableIngredient.ingredient.id);
    if (foundIngredient) {
      foundIngredient.quantity++;
      this.ingredientCount++;
    } else {
      this.selectedIngredients.ingredients.push(
        {ingredientGroup: this.ingredientGroup, ingredient: orderableIngredient.ingredient, quantity: 1}
      );
      this.ingredientCount++;
    }

    // check if need to disable
    if (this.ingredientGroup.maxNumberOfIngredients == this.ingredientCount) {
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
    if (this.ingredientGroup.maxNumberOfIngredients == this.ingredientCount) {
      let otherOrderableIngredient: OrderableIngredient;
      for (var i = 0; i < this.orderableIngredients.length; i++) {
        otherOrderableIngredient = this.orderableIngredients[i];
        otherOrderableIngredient.disabled = false;
      }
    }

    var selectedIngredient: any;
    for (var i = 0; i < this.selectedIngredients.ingredients.length; i++) {
      selectedIngredient = this.selectedIngredients.ingredients[i];
      if (selectedIngredient.ingredient.id == orderableIngredient.ingredient.id) {
        if (selectedIngredient.quantity > 1) {
          selectedIngredient.quantity--;
        } else {
          this.selectedIngredients.ingredients.splice(i--, 1);
        }

        this.ingredientCount--;

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

  changeGroup(index: number, ingredientGroup: IngredientGroup): void {

      this.currentIngredientGroup = ingredientGroup;
      this.ingredientGroup = ingredientGroup;
      console.log(this.currentIngredientGroup);
      this.jumpToIngredientGroup(index);
  }

  jumpToIngredientGroup(index: number): void {
    this.ingredientGroupIndex = index - 1;

    if (index >= this.item.ingredientGroups.length) {
      this.doneIngredientOrder();
    } else {
      this.nextIngredientOrder();
    }
  }
}
