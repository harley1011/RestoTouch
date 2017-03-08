import {Language} from './language';
import { Menu } from './menu';
import { Payment } from './payment';
import { BusinessHour } from './business-hour';

export class Restaurant {

  constructor(
              public address: string,
              public supportedLanguages: Array<Language>,
              public translations: Array<RestaurantTranslations>,
              public selectedTranslation: RestaurantTranslations,
              public Menus: Menu[],
              public payments: Payment[],
              public businessHours: BusinessHour[],
              public paypalId: string,
              public kitCashModeFlag: string,
              public id?: number) {
  }
}

export class RestaurantTranslations {

  constructor(public name: string,
              public description: string,
              public languageCode: string) {
  }
}
