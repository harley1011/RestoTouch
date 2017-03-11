import { SelectedIngredients } from './selected-ingredients';
import { Item } from './items';
import { Size } from './size';

export class Order {
  constructor (
    public orderedItems: Array<{item: Item, sizes: Array<{size: Size, selectedIngredients: SelectedIngredients}>}>,
    public total: number,
    public paymentId: string,
    public id?: number,
    public restaurantId?: number
  ) { }

  addOrder(item: Item, size: Size, selectedIngredients: SelectedIngredients, ingredientPrice: number): void {
    let foundItem = this.orderedItems.find((currentItem: any) => currentItem.item.id == item.id);
    if (foundItem) {
      foundItem.sizes.push({size: size, selectedIngredients: selectedIngredients});
    } else {
      this.orderedItems.push({item: item, sizes: [{size: size, selectedIngredients: selectedIngredients}]});
    }

    this.total += size.price + ingredientPrice;
  }

  removeFromOrder(item: Item, size: Size, selectedIngredients: SelectedIngredients): void {
    let orderedItem: any;
    let orderedSize: any;
    for (var i = 0; i < this.orderedItems.length; i++) {
      orderedItem = this.orderedItems[i];
      if (orderedItem.item.id != item.id) continue;

      for (var j = 0; j < orderedItem.sizes.length; j++) {
        orderedSize = orderedItem.sizes[j];
        if (size.id === orderedSize.size.id && (selectedIngredients == null ||
          selectedIngredients === orderedSize.selectedIngredients)) {
          orderedItem.sizes.splice(j, 1);
          break;
        }
      }

      if (orderedItem.sizes.length == 0) {
        this.orderedItems.splice(i, 1);
      }
      break;
    }

    this.total -= orderedSize.size.price;
    if (orderedSize.selectedIngredients == null) return;

    let ingredient: any;
    for (var i = 0; i < orderedSize.selectedIngredients.ingredients.length; i++) {
      ingredient = orderedSize.selectedIngredients.ingredients[i];
      this.total -= (ingredient.quantity * ingredient.ingredient.price);
    }
  }
}
