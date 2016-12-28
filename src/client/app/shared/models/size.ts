export class Size {
  constructor (
    public name: string,
    public price: number,
    public translations: Array<SizeTranslations>,
    public selectedTranslation: SizeTranslations
	) { }
}

export class SizeTranslations {
	constructor (
		public name: string,
		public languageCode: string
		) { }
}
