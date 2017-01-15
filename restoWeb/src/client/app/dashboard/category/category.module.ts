import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from 'ng2-translate';
import {TranslationSelectModule} from '../../shared/index';

@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule, TranslationSelectModule],
    declarations: [CategoryComponent],
    exports: [CategoryComponent]
})

export class CategoryModule { }
