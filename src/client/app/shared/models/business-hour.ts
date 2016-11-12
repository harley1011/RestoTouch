export class BusinessHour {
    constructor(public day: number,
                public shift: number,
                public openTime: string,
                public closeTime: string,
                public active: boolean,
                public id?: number) { }
}
