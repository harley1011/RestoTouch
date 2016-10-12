import { Menu } from '../../menu/menu';

export class Restaurant {
  id: number;
  constructor (
    public name: string,
    public description: string,
    public address: string,
    public mOpen: string,
    public mClose: string,
    public tuOpen: string,
    public tuClose: string,
    public wOpen: string,
    public wClose: string,
    public thOpen: string,
    public thClose: string,
    public fOpen: string,
    public fClose: string,
    public saOpen: string,
    public saClose: string,
    public suOpen: string,
    public suClose: string,
    public Menus: Menu[]
	) { }
}
