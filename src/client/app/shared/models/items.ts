import Size from './size';

export class Item {
    id: number;

    constructor(public name: string,
                public description: string,
                public imageUrl?: string,
                public sizes?: Array<Size>) { }
}
