import {Size} from './size';
import {IngredientGroup} from './ingredient-group';
import {Category} from './category';
import {ItemCategory} from './item-category';
import {Translation, EntityTranslation} from './translation';

export class Item extends Translation {

  static fromJson(obj: any, selectLanguage: string): Item {
    let translation = new Array<ItemTranslations>();
    let sizes = new Array<Size>();
    let ingredientGroups = new Array<IngredientGroup>();

    obj.translations.forEach((t: ItemTranslations) => {
      translation.push(ItemTranslations.fromJson(t));
    });

    ItemTranslations.fromJson(obj.translations);

    obj.sizes.forEach((t: Size) => {
      sizes.push(Size.fromJson(t));
    });

    obj.ingredientGroups.forEach((i : IngredientGroup) => {
      let ingredientGroup = IngredientGroup.fromJson(i);
      ingredientGroup.addNewIngredient(selectLanguage);
      ingredientGroups.push(ingredientGroup);
    });

    let item = new Item(translation, null, [],ingredientGroups, obj.imageUrl, sizes, null, null, obj.id);
    item.addNewSize(selectLanguage);
    item.addAndSelectNewTranslation(selectLanguage);
    return item;
  }

  constructor(public translations: Array<ItemTranslations>,
              public selectedTranslation: ItemTranslations,
              public categories: Array<Category>,
              public ingredientGroups?: Array<IngredientGroup>,
              public imageUrl?: string,
              public sizes?: Array<Size>,
              public ItemCategory?: ItemCategory,
              public newSize?: Size,
              public id?: number,) {
    super(translations, selectedTranslation);
  }

  addAndSelectNewTranslation(languageCode: string) {
    this.addIfNotExistsAndSelect(languageCode, new ItemTranslations('', '', languageCode));

    this.addNewIngredientGroupTranslation(languageCode);
    this.addNewSizeTranslation(languageCode);
    this.newSize.addAndSelectNewTranslation(languageCode);
  }

  addNewIngredientGroupTranslation(languageCode: string) {
    this.ingredientGroups.forEach(ingredientGroup => {
      ingredientGroup.addAndSelectNewTranslation(languageCode);
    });
  }

  addNewSizeTranslation(languageCode: string) {
    this.sizes.forEach(size => {
      size.addAndSelectNewTranslation(languageCode);
    });
  }

  addNewIngredientGroup(languageCode: string) {
    let newIngredientGroup = new IngredientGroup([], null, [], 1, 1, this.ingredientGroups.length + 1, null);
    this.translations.forEach(translation => {
      newIngredientGroup.addAndSelectNewTranslation(translation.languageCode);
    });
    newIngredientGroup.checkAndSelectIfTranslationExists(languageCode);
    this.ingredientGroups.push(newIngredientGroup);
  }

  addSize(languageCode: string) {
    this.sizes.push(this.newSize);
    this.addNewSize(languageCode);
  }

  addNewSize(languageCode: string) {
    this.newSize = this.createNewSize(languageCode);
  }

  private createNewSize(languageCode: string) {
    let size = new Size([], null, 0);
    this.translations.forEach(translation => {
      size.addAndSelectNewTranslation(translation.languageCode);
    });
    size.checkAndSelectIfTranslationExists(languageCode);
    return size;
  }
}

export class ItemTranslations extends EntityTranslation {

  static fromJson(obj: any): ItemTranslations {
    return new ItemTranslations(obj.name, obj.description, obj.languageCode);
  }

  constructor(public name: string,
              public description: string,
              public languageCode: string) {
    super(languageCode);
  }

}
