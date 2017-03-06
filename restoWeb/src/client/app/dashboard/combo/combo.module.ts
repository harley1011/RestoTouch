import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboComponent } from './combo.component';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from 'ng2-translate';
import {TranslationSelectModule} from '../../shared/index';

@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule, TranslationSelectModule],
    declarations: [ComboComponent],
    exports: [ComboComponent]
})

export class ComboModule { }
