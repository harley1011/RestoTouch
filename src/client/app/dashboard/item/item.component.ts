import {Component} from '@angular/core';
import {Item } from './../../shared/models/items';

@Component({
  moduleId: module.id,
  selector: 'item-cmp',
  templateUrl: 'item.component.html',
})

export class ItemComponent {
  item = new Item('', '', '');

  onSubmit() {
    this.item = new Item('Hello', 'uuu.png');
  }

  newItem() {
    this.item = new Item('', '', '');
  }
}
