import {Component, OnInit} from '@angular/core';
import {Order} from '../../shared/models/order';
import {ItemService} from '../item/item.service';
import {Item} from './../../shared/models/items';


@Component({
  moduleId: module.id,
  selector: 'unpaid-orders-cmp',
  templateUrl: 'unpaid-orders.component.html',
  providers: [ItemService]
})

export class UnpaidOrdersComponent implements OnInit {
	orders: Array<Order>;
	items: Array<Item>;

	constructor(private itemService: ItemService) {
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