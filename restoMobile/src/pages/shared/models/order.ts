import { OrderIngredients } from './order-ingredients';
import { Item } from './items';
import { Size } from './size';

export class Order {
  constructor (
    public orderedItems: Array<{item: Item, sizes: Array<{size: Size, ingredients: OrderIngredients}>}>,
    public total: number,
    public id?: number
  ) { }
}
