import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-ingredient-group',
  templateUrl: 'ingredient-group.html'
})
export class IngredientGroupPage {
  selectedLanguage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
}
