import {Category} from './category';

export class Menu {
  constructor (
    public name: string,
    public categories: Category [], // This menu will contain the list of selected categories.
    public id?: number
	) { }
}
