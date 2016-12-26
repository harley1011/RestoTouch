
export class Ingredient {
  constructor(public name: string,
              public addByDefault: boolean,
              public price: number,
              public imageUrl?: string,
              public id?: number) {
  }
}

