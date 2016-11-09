import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './item.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule, FormsModule, FileUploadModule],
    declarations: [ItemComponent],
    exports: [ItemComponent]
})

export class ItemModule { }
