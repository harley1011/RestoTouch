import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Item } from '../shared/models/items';
import { IngredientGroup } from '../shared/models/ingredient-group';

@Component({
  selector: 'page-ingredient-group',
  templateUrl: 'ingredient-group.html'
})
export class IngredientGroupPage {
  selectedLanguage: any;
  item: Item;
  ingredientGroup: IngredientGroup;
  ingredientGroupIndex: number;
  complexOrderCallback: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedLanguage = navParams.get('language');
    this.item = navParams.get('item');
    this.ingredientGroupIndex = navParams.get('ingredientGroupIndex');
    this.ingredientGroup = this.item.ingredientGroups[this.ingredientGroupIndex];
    this.ingredientGroup.selectedTranslation = this.ingredientGroup.translations.find(translation => translation.languageCode == this.selectedLanguage.languageCode);
    this.complexOrderCallback = navParams.get('callback');
  }

  previousIngredientGroup(): void {
    this.navCtrl.pop({
      animate: true,
      animation: "ios-transition"
    });
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
      callback: this.complexOrderCallback
    }, {
      animate: true,
      animation: "ios-transition"
    });
  }

  doneIngredientOrder(): void {
    this.complexOrderCallback(23).then(() => {
      var index = this.ingredientGroupIndex + 1;
      var startIndex = this.navCtrl.indexOf(this.navCtrl.last()) - (this.ingredientGroupIndex);
      this.navCtrl.remove(startIndex, index, {
        animate: true,
        animation: "ios-transition"
      });
    });
  }
}
