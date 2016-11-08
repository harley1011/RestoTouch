export class BusinessHour {
    constructor(public day: number,
                public openTime: string,
                public closeTime: string,
                public afterBreak: boolean,
                public id?: number) { }
}
