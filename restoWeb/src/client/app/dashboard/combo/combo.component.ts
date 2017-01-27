import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ComboService} from './combo.service';
import {Combo, ComboTranslations} from '../../shared/models/combo';
import {Language} from '../../shared/models/language';
import { ItemService } from '../item/item.service';
import { Item } from '../../shared/models/items';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';

@Component({
	moduleId: module.id,
	selector: 'combo-cmp',
	templateUrl: 'combo.component.html',
  providers: [ComboService,ItemService]
})

export class ComboComponent implements OnInit {
  create: boolean;
  combo: Combo;
	items: Array<Item>;
  errorMessage: string;
  @ViewChild(TranslationSelectComponent) translationSelectComponent: TranslationSelectComponent;

  constructor(private route: ActivatedRoute,
              private comboService: ComboService,
              private router: Router,
              private itemService: ItemService) {

  }

    ngOnInit(): void {
    // this.getCombo();
    }
}
