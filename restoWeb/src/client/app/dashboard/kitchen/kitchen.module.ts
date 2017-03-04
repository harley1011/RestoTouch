import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import {TranslationSelectModule} from '../../shared/translation-select/translation-select.module';
import {LanguageService} from '../../services/language.service';
import {KitchenComponent} from './kitchen.component';
@NgModule({
  imports: [CommonModule, TranslateModule, TranslationSelectModule],
  declarations: [KitchenComponent],
  exports: [KitchenComponent]
})

export class KitchenModule {
	constructor(private languageService: LanguageService) {
  }
}
