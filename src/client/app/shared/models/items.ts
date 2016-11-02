import size from './size';

export class Item {
    id: number;
    sizes: Array<size>;

    constructor(public name: string,
                public description: string,
                public imageUrl?: string) {
        this.sizes = new Array<size>();
    }
}
