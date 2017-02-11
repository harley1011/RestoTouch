import {Component, OnInit} from '@angular/core';
import {Order} from '../../shared/models/order';
import {ItemService} from '../item/item.service';
import {Item} from './../../shared/models/items';
import {TranslateService} from 'ng2-translate';


@Component({
  moduleId: module.id,
  selector: 'unpaid-orders-cmp',
  templateUrl: 'unpaid-orders.component.html',
  providers: [ItemService]
})

export class UnpaidOrdersComponent implements OnInit {
	orders: Array<Order>;
	items: Array<Item>;

	constructor(private itemService: ItemService,
              private translate: TranslateService) {
	}

	ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
        this.items = items;
      },
      error => {
        console.log(error);
      }
    );
  }
}