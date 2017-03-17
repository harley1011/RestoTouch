import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Order } from '../../shared/models/order';
import { TranslateService } from 'ng2-translate';
import { OrderService } from '../../services/order.service';
import { OrderNotifierService } from '../../services/order-notifier.service';
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
  id: number;

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

	constructor(private orderService: OrderService,
              private orderNotifierService: OrderNotifierService,
              private translate: TranslateService,
              private route: ActivatedRoute) {
	}

	ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
        if (params['id']) {
          this.id = params['id'];
          this.orderNotifierService.connectToOrderNotifier(this.id).subscribe((order: any) => {
            this.order = JSON.parse(order);
            console.log(this.order);
            this.order.orderedItems.forEach(orderedItem => {
                orderedItem.item.selectedTranslation = orderedItem.item.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
            });
            this.orders.push(this.order);
          });
          //Not working, formatting of returned orders isn't matching the order model

          this.orderService.retrieveOrders(this.id).subscribe(orders => {
            console.log(orders);
            this.orders = orders;
            //this.orders = orders;
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
    //order.paid = true;
    //order.restaurantId = this.id;
    //console.log(order);
    //this.orderService.placeOrder(order);
    this.orders.splice(i, 1);
  }
}
