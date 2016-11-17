import { Language } from './language';

export class Menu {
  id: number;
  constructor (
    public name: string,
    public supportedLanguages: Array<Language>
	) { }
}
