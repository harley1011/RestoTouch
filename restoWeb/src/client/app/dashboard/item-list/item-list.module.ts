import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemListComponent } from './item-list.component';
import {TranslateModule} from 'ng2-translate';
import {TranslationSelectModule} from '../../shared/translation-select/translation-select.module';
import {LanguageService} from '../../services/language.service';
import { ItemFilterPipe }   from './data-filter.pipe';

@NgModule({
    imports: [CommonModule, TranslateModule, FormsModule, TranslationSelectModule],
    declarations: [ItemListComponent, ItemFilterPipe],
    exports: [ItemListComponent]
})

export class ItemListModule {

  constructor(private languageService: LanguageService) {

  }
}
