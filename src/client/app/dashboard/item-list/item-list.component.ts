import {Component, OnInit} from '@angular/core';
import {Item } from './../../shared/models/items';

@Component({
  moduleId: module.id,
  selector: 'item-list-cmp',
  templateUrl: 'item-list.component.html',
})

export class ItemListComponent implements OnInit {
  items: Array<Item>;

  ngOnInit(): void {
    this.items = [new Item('Hot dog', 'A yummy hot dog')];
  }

  add(): void {
    this.items.push(new Item('Drink', 'A drinl'));
  }
}
