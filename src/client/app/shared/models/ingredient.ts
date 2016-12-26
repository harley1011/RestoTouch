import {Size} from './size';

export class Ingredient {
  constructor(public name: string,
              public imageUrl?: string,
              public sizes?: Array<Size>,
              public id?: number) {
  }
}

