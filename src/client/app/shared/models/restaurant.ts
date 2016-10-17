import {Language} from './language';
import { Menu } from './menu';

export class Restaurant {

  constructor(
              public address: string,
              public mOpen: string,
              public mClose: string,
              public tuOpen: string,
              public tuClose: string,
              public wOpen: string,
              public wClose: string,
              public thOpen: string,
              public thClose: string,
              public fOpen: string,
              public fClose: string,
              public saOpen: string,
              public saClose: string,
              public suOpen: string,
              public suClose: string,
              public supportedLanguages: Array<Language>,
              public translations: Array<RestaurantTranslations>,
              public selectedTranslation: RestaurantTranslations,
              public Menus: Menu[],
              public id?: number) {
  }
}

export class RestaurantTranslations {

  constructor(public name: string,
              public description: string,
              public languageCode: string) {
  }
}