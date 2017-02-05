import { OrderIngredients } from './order-ingredients';
import { Item } from './items';
import { Size } from './size';

export class Order {
  constructor (
    public orderedItems: Array<{item: Item, sizes: Array<{size: Size, quantity: number}>, ingredients:  Array<OrderIngredients>}>,
    public total: number,
    public id?: number
  ) { }
}

