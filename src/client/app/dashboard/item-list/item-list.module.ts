import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemListComponent } from './item-list.component';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [CommonModule, TranslateModule,, FormsModule],
    declarations: [ItemListComponent],
    exports: [ItemListComponent]
})

export class ItemListModule { }
