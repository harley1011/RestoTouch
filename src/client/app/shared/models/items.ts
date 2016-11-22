import {Size} from './size';
import {Language} from './language';

export class Item {
    constructor(public name: string,
                public description: string,
                public supportedLanguages: Array<Language>,
                public imageUrl?: string,
                public sizes?: Array<Size>,
                public id?: number) { }
}
