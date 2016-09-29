export class Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  openingHours: OpeningHour[];
}

export class OpeningHour {
  open: string;
  close: string;

  constructor(open: string, close: string) {
    this.open = open;
    this.close = close;
  }
}
