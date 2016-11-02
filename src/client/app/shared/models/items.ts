import Size from './size';

export class Item {
    id: number;
    sizes: Array<Size>;

    constructor(public name: string,
                public description: string,
                public imageUrl?: string) {
        this.sizes = new Array<Size>();
    }
}
