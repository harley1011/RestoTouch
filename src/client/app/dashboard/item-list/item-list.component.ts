import {Component, OnInit} from '@angular/core';
import {Item } from './../../shared/models/items';
import {ItemService} from '../item/item.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'item-list-cmp',
  templateUrl: 'item-list.component.html',
  providers: [ItemService]
})

export class ItemListComponent implements OnInit {
  items: Array<Item>;
  constructor(private itemService: ItemService, private router: Router) {}
  ngOnInit(): void {

    this.itemService.getItems().subscribe(items => {
        items.forEach(function(item) {
          //todo: show the language the user is using for the application if available
//          item.imageUrl = 'http://beverlypress.com/wp-content/uploads/2016/07/hot-dog-06.jpg';
            item.imageUrl ='http://acrossthefader.org/wp-content/uploads/2013/05/bigmac.jpg';
        });
        this.items = items;
      },
      error =>  {
        console.log(error);
      }
    );
  }

  add(): void {
    this.router.navigate(['/dashboard/item']);
  }

  modify(item: Item): void {
    this.router.navigate(['/dashboard/item', item.id]);
  }
}
