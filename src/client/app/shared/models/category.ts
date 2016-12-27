import { Language } from './language';

export class Category {
  constructor (
    public categoryName: string,
    public supportedLanguages: Array<Language>,
    public id?: number
  ) { }
}
