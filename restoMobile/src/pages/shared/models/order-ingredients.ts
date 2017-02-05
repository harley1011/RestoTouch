import { IngredientGroup } from './ingredient-group';
import { Ingredient } from './ingredient';

export class OrderIngredients {
  constructor (
    public ingredients: Array<{ingredientGroup: IngredientGroup, ingredient: Ingredient, quantity: number}>,
    public id?: number
  ) { }
}
