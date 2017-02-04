import { Ingredient } from '../shared/models/ingredient';

export class OrderableIngredient {
  constructor (
    public ingredient: Ingredient,
    public selected: boolean,
    public disabled: boolean,
    public amount: number
  ) { }
}
