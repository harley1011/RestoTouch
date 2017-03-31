import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Order } from '../../shared/models/order';
import { Restaurant } from '../../shared/models/restaurant';

import { TranslateService } from 'ng2-translate';
import { OrderService } from '../../services/order.service';
import { OrderNotifierService } from '../../services/order-notifier.service';
import { RestaurantService } from '../../services/restaurant.service';

import { TranslationSelectComponent } from '../../shared/translation-select/translation-select.component';
import { Language } from './../../shared/models/language';

@Component({
  moduleId: module.id,
  selector: 'unpaid-orders-cmp',
  templateUrl: 'unpaid-orders.component.html',
  providers: [OrderService, OrderNotifierService]
})

export class UnpaidOrdersComponent implements OnInit {
	orders: Array<Order> = [];
  order: Order;
  restoMode: string;
  id: number;
  itemsVisible: boolean = true;
  errorMessage: string;

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

	constructor(private orderService: OrderService,
              private orderNotifierService: OrderNotifierService,
              private restaurantService: RestaurantService,
              private translate: TranslateService,
              private route: ActivatedRoute) {
	}

	ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
        if (params['id']) {
          this.id = params['id'];
          this.restaurantService.getRestaurant(this.id).subscribe( restaurant => {
            this.restoMode = restaurant.kitCashModeFlag;
          });
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
            console.log(orders);
            this.orders = orders;
            /*
            this.orders.orderedItems.forEach(orderedItem => {
             orderedItem.item.selectedTranslation = orderedItem.item.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
            });*/

          })
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

  paid(order: Order) {
    let i = this.orders.indexOf(order);
    this.orders.splice(i, 1);
    order.status = 'paidNotComplete';
    if(this.restoMode === 'cnk') {
      order.status = 'paidComplete';
    }
    this.orderService.payForOrder(this.restoMode, order).subscribe(generalResponse => {
          },
      error => {
          this.errorMessage = <any> error;
     });
  }

  cancelOrder(order: Order) {
    let i = this.orders.indexOf(order);
    this.orders.splice(i, 1);
    this.orderService.cancelOrder(order).subscribe(generalResponse => {
          },
      error => {
          this.errorMessage = <any> error;
     });
  }

  itemVisible() {
    this.itemsVisible = !this.itemsVisible;
  }
}
