export class Size {
  constructor (
    public translations: Array<SizeTranslations>,
    public selectedTranslation: SizeTranslations,
    public price: number
	) { }
}


export class SizeTranslations {
  constructor(public name: string,
              public languageCode: string) { }
}
