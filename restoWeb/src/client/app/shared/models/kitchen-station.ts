//import { Language } from './language';
import { Item } from './items';

export class KitchenStation {
  constructor (
    public name: string,
   // public translations: Array<KitchenTranslations>,
    //public selectedTranslation: KitchenTranslations,
    public kitItem: Array<Item>,
    public id?: number
  ) { }
}

// export class KitchenTranslations {
// 	constructor(
// 		public languageCode: string,
//         public name: string
// 	) { }
// }
