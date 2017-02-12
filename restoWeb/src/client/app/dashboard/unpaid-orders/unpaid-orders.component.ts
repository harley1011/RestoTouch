import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Order } from '../../shared/models/order';
//import {ItemService} from '../item/item.service';
//import {Item} from './../../shared/models/items';
import { TranslateService } from 'ng2-translate';
import { OrderService } from '../../services/order.service';
import { OrderNotifierService } from '../../services/order-notifier.service';
import { TranslationSelectComponent } from '../../shared/translation-select/translation-select.component';

@Component({
  moduleId: module.id,
  selector: 'unpaid-orders-cmp',
  templateUrl: 'unpaid-orders.component.html',
  providers: [OrderService, OrderNotifierService]
})

export class UnpaidOrdersComponent implements OnInit {
	orders: Array<Order> = [];
  order: Order;
  id = 0;

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
          console.log(this.id);
        }
      });
    this.orderNotifierService.connectToOrderNotifier().subscribe((order: any) => { // As a test
      this.order = JSON.parse(order);
      console.log(this.order);
      this.orders.push(this.order)
      //Order needs to be parsed with JSON.parse(order)
      //Then added to the orders array, this.orders.push(order);
      //The commented code in the html can be used to access and display order properties.
    });
  }
}