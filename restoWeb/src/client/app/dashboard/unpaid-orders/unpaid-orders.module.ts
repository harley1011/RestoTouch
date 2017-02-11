import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnpaidOrdersComponent} from './unpaid-orders.component';
import {TranslateModule} from 'ng2-translate';
import {TranslationSelectModule} from '../../shared/translation-select/translation-select.module';
import {LanguageService} from '../../services/language.service';
@NgModule({
  imports: [CommonModule, TranslateModule, TranslationSelectModule],
  declarations: [UnpaidOrdersComponent],
  exports: [UnpaidOrdersComponent]
})

export class UnpaidOrdersModule {
	constructor(private languageService: LanguageService) {
  }
}
