import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [CommonModule, TranslateModule],
    declarations: [CategoryListComponent],
    exports: [CategoryListComponent]
})

export class CategoryListModule { }
