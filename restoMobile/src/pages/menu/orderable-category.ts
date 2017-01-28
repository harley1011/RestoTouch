import { Category } from '../shared/models/category';
import { Item } from '../shared/models/items';
import { Size } from '../shared/models/size';

export class OrderableCategory {
  constructor (
    public category: Category,
    public items: Array<OrderableItem>
  ) { }
}

export class OrderableItem {
  constructor (
    public item: Item,
    public sizes: Array<OrderableSize>
  ) { }
}

export class OrderableSize {
  constructor (
    public size: Size,
    public count: number
  ) { }
}
