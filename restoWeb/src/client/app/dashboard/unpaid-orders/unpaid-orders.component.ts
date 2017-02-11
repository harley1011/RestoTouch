import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../shared/models/order';
//import {ItemService} from '../item/item.service';
//import {Item} from './../../shared/models/items';
import { TranslateService } from 'ng2-translate';
import { OrderService } from '../../services/order.service';
import { OrderNotifierService } from '../../services/order-notifier.service';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';

@Component({
  moduleId: module.id,
  selector: 'unpaid-orders-cmp',
  templateUrl: 'unpaid-orders.component.html',
  providers: [OrderService, OrderNotifierService]
})

export class UnpaidOrdersComponent implements OnInit {
	orders: Array<Order>;

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

	constructor(private orderService: OrderService,
              private orderNotifierService: OrderNotifierService,
              private translate: TranslateService) {
	}

	ngOnInit(): void {
    this.orderNotifierService.connectToOrderNotifier().subscribe((order: any) => {
      console.log(order); // As a test
      //Order needs to be parse with JSON.parse(order)
      //Then added to 
    });
  }
}