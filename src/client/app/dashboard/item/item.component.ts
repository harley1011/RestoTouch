import {Component, OnInit} from '@angular/core';
import {Item } from './../../shared/models/items';

@Component({
  moduleId: module.id,
  selector: 'item-list-cmp',
  templateUrl: 'item.component.html',
})

export class ItemComponent implements OnInit {
  item: Item;

  ngOnInit(): void {
  }

  add(): void {

  }
}
