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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit(): void {
    this.selectedLanguage = this.navParams.get('language');
    this.order = this.navParams.get('order');

    this.initOrder();
  }

  initOrder(): void {

  }

  cancel(): void {
    this.navCtrl.pop({
      animate: true,
      animation: "md-transition",
      direction: 'back'
    });
  }
}
