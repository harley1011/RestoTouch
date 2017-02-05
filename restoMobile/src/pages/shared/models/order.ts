import { OrderIngredients } from './order-ingredients';
import { Item } from './items';
import { Size } from './size';

export class Order {
  constructor (
    public item: Item,
    public size: Size,
    public ingredients: Array<OrderIngredients>,
    public id?: number
  ) { }
}
