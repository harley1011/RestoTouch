import { SelectedIngredients } from './selected-ingredients';
import { Item } from './items';
import { Size } from './size';

export class Order {
  constructor (
    public orderedItems: Array<{item: Item, sizes: Array<{size: Size, selectedIngredients: SelectedIngredients}>}>,
    public total: number,
    public paymentId: string,
    public id?: number,
    public createdAt?: Date,
    public notifyOrderDetail?: string
  ) { }
}
