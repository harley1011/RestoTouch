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
    this.items = [new Item('Hot dog', 'A yummy hot dog', 'http://beverlypress.com/wp-content/uploads/2016/07/hot-dog-06.jpg'),
      new Item('Hamburger', 'A delicious hamburger', 'http://blog.timesunion.com/opinion/files/2012/03/0316_WVfastfood1.jpg'),
      new Item('Hot dog', 'A yummy hot dog', 'http://beverlypress.com/wp-content/uploads/2016/07/hot-dog-06.jpg'),
      new Item('Hamburger', 'A delicious hamburger', 'http://blog.timesunion.com/opinion/files/2012/03/0316_WVfastfood1.jpg'),
      new Item('Hot dog', 'A yummy hot dog', 'http://beverlypress.com/wp-content/uploads/2016/07/hot-dog-06.jpg'),
      new Item('Hamburger', 'A delicious hamburger', 'http://blog.timesunion.com/opinion/files/2012/03/0316_WVfastfood1.jpg')];
  }

  add(): void {
    this.items.push(new Item('Drink', 'A drinl'));
  }
}
