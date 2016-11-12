import {Language} from './language';
import { Menu } from './menu';
import { BusinessHour } from './business-hour';

export class Restaurant {

  constructor(
              public address: string,
              public supportedLanguages: Array<Language>,
              public translations: Array<RestaurantTranslations>,
              public selectedTranslation: RestaurantTranslations,
              public Menus: Menu[],
              public businessHours: BusinessHour[],
              public id?: number) {
  }
}

export class RestaurantTranslations {

  constructor(public name: string,
              public description: string,
              public languageCode: string) {
  }
}
