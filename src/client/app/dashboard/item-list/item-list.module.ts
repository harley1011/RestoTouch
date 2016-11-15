import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemListComponent } from './item-list.component';


@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [ItemListComponent],
    exports: [ItemListComponent]
})

export class ItemListModule { }
