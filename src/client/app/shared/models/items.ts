import {Size} from './size';

export class Item {
    constructor(public name: string,
                public description: string,
                public imageUrl?: string,
                public sizes?: Array<Size>,
                public id?: number) { }
}
