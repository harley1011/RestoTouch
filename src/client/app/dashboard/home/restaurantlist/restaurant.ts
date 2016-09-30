export class Restaurant {
  constructor (
    public id: number,
    public name: string,
    public description: string,
    public address: string,
    public openingHours: {
      open: string,
      close: string
    }[]
	) { }
}
