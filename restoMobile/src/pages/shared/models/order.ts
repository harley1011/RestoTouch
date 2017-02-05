import { OrderIngredients } from './order-ingredients';

export class Order {
  constructor (
    public itemId: number,
    public sizeId: number,
    public ingredients: Array<OrderIngredients>,
    public cost: number,
    public id?: number
  ) { }
}
