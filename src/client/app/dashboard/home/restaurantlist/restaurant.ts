export class Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  openingHours: {
    open: string,
    close: string
  }[];
}
