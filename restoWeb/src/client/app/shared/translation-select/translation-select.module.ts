import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslationSelectComponent} from './translation-select.component';
import {TranslateModule} from 'ng2-translate';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ng2-bootstrap/modal';
import {DropdownModule} from 'ng2-bootstrap/dropdown';

@NgModule({
  imports: [CommonModule, TranslateModule, FormsModule, ModalModule.forRoot(), DropdownModule.forRoot()],
  declarations: [TranslationSelectComponent],
  exports: [TranslationSelectComponent]
})

export class TranslationSelectModule {
}
