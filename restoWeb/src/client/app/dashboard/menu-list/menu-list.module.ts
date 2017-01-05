import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list.component';
import {TranslateModule} from 'ng2-translate';
import {TranslationSelectModule} from '../../shared/translation-select/translation-select.module';
@NgModule({
    imports: [CommonModule, TranslateModule, TranslationSelectModule],
    declarations: [MenuListComponent],
    exports: [MenuListComponent]
})

export class MenuListModule { }
