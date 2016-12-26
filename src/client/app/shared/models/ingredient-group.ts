import {Ingredient} from './ingredient';

export class IngredientGroup {
    constructor(
                public ingredients: Array<Ingredient>,
                public numberOfIngredientsAllowed: number,
                public id?: number) { }
}

