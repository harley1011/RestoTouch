import {Component, OnInit, ViewChild} from '@angular/core';
import {Item} from './../../shared/models/items';
import {Language} from './../../shared/models/language';
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
  sortAscending: boolean;

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

  constructor(private itemService: ItemService, private router: Router) {
    this.sortAscending = false;
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

  sortItems(): void {
    this.sortAscending = !this.sortAscending;
    if (this.sortAscending) {
      this.items.sort(compareItemAscending);
    } else {
      this.items.sort(compareItemDescending);
    }
  }
}

function compareItemAscending (item1: Item, item2: Item) {
  if (item1.selectedTranslation.name < item2.selectedTranslation.name) {
    return -1;
  } else if (item1.selectedTranslation.name > item2.selectedTranslation.name) {
    return 1;
	} else {
		return 0;
	}
}

function compareItemDescending (item1: Item, item2: Item) {
  if (item1.selectedTranslation.name > item2.selectedTranslation.name) {
    return -1;
  } else if (item1.selectedTranslation.name < item2.selectedTranslation.name) {
    return 1;
	} else {
		return 0;
	}
}
