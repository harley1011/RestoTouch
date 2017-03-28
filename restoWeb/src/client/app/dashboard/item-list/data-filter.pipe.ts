import {Item} from './../../shared/models/items';
import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
@Pipe({
  name: 'itemFilter'
})
export class ItemFilterPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}
  transform(items: Item[], query: any, sortAscending: number): any {

    if (items == null) return items;

    items = items.filter(item => item.selectedTranslation.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    if (sortAscending == 1) {
      items.sort(compareItemAscending);
    } else if (sortAscending == 2) {
      items.sort(compareItemDescending);
    }

    return items;
  }
}

function compareItemAscending (item1: Item, item2: Item) {
  if (item1.selectedTranslation.name < item2.selectedTranslation.name) {
    return -1;
  } else if (item1.selectedTranslation.name > item2.selectedTranslation.name) {
    return 1;
	} else {
		return 0;
	}
}

function compareItemDescending (item1: Item, item2: Item) {
  if (item1.selectedTranslation.name > item2.selectedTranslation.name) {
    return -1;
  } else if (item1.selectedTranslation.name < item2.selectedTranslation.name) {
    return 1;
	} else {
		return 0;
	}
}
