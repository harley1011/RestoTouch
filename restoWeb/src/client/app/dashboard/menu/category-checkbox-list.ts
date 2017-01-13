import {Item} from '../../shared/models/items';
import {Category} from '../../shared/models/category';

export class CategoryCheckboxList {
  constructor (
    public category: Category,
    public items: Array<ItemCheckbox>
  ) { }
}

export class ItemCheckbox {
  constructor (
    public item: Item,
    public itemCategoryId: number,
    public enabled: boolean
  ) { }
}
