import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from 'ng2-translate';
import { OrderService } from '../../services/order.service';
import { OrderNotifierService } from '../../services/order-notifier.service';
import { Order } from '../../shared/models/order';
import { RestaurantService } from '../../services/restaurant.service';

import { TranslationSelectComponent } from '../../shared/translation-select/translation-select.component';
import { Language } from './../../shared/models/language';

@Component({
  moduleId: module.id,
  selector: 'kitchen-cmp',
  templateUrl: 'kitchen.component.html',
  providers: [OrderService, OrderNotifierService]
})

export class KitchenComponent implements OnInit {

  orders: Array<Order> = [];
  order: Order;
  id: number;
  restoMode: string;

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

	constructor(private orderService: OrderService,
              private orderNotifierService: OrderNotifierService,
              private restaurantService: RestaurantService,
				      private route: ActivatedRoute,
				      private translate: TranslateService) {

	}

	ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
        if (params['id']) {
          this.id = params['id'];
          this.restaurantService.getRestaurant(this.id).subscribe( restaurant => {
            this.restoMode = restaurant.kitCashModeFlag;
          })
          this.orderNotifierService.connectToOrderNotifier(this.id).subscribe((order: any) => {
            this.order = JSON.parse(order);
            console.log(this.order);
            this.order.orderedItems.forEach(orderedItem => {
              orderedItem.item.selectedTranslation = orderedItem.item.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
            });
            this.orders.push(this.order);
          });


           //Get previously cached orders
           this.orderService.retrieveOrders(this.id).subscribe(orders => {
           this.orders = orders;
           });

        }
    });
  }

  onSelectLanguage(language: Language) {
    this.orders.forEach(order => {
      order.orderedItems.forEach(orderedItem => {
        orderedItem.item.selectedTranslation = orderedItem.item.translations.find(translation => translation.languageCode === language.languageCode);
      });
    });
  }

}
