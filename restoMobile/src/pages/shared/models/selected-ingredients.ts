import { IngredientGroup } from './ingredient-group';
import { Ingredient } from './ingredient';

export class SelectedIngredients {
  constructor (
    public ingredients: Array<{ingredientGroup: IngredientGroup, ingredient: Ingredient, quantity: number}>,
    public id?: number
  ) { }
}
