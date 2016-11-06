import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemListComponent } from './item-list.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule, FormsModule],
    declarations: [ItemListComponent],
    exports: [ItemListComponent]
})

export class ItemListModule { }
