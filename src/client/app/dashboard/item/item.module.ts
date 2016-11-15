import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './item.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [ItemComponent],
    exports: [ItemComponent]
})

export class ItemModule { }
