import {Category} from './category';

export class Menu {
  id: number;
  constructor (
    public name: string,
    public categories: Category [] // This menu will contain the list of selected categories.
	) { }
}
