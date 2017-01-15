import {Component, OnInit, ViewChild} from '@angular/core';
import {Item} from '../../../../../../restoCommon/shared/models/items';
import {Language} from '../../../../../../restoCommon/shared/models/language';
import {ItemService} from '../item/item.service';
import {Router} from '@angular/router';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';
@Component({
  moduleId: module.id,
  selector: 'item-list-cmp',
  templateUrl: 'item-list.component.html',
  providers: [ItemService]
})

export class ItemListComponent implements OnInit {
  items: Array<Item>;

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

  constructor(private itemService: ItemService, private router: Router) {
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
        items.forEach(item => {
          item.selectedTranslation = item.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
        });
        this.items = items;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelectLanguage(language: Language) {
    this.items.forEach(item => {
      item.selectedTranslation = item.translations.find(translation => translation.languageCode === language.languageCode);
    });
  }

  add(): void {
    this.router.navigate(['/dashboard/item']);
  }

  modify(item: Item): void {
    this.router.navigate(['/dashboard/item', item.id]);
  }
}
