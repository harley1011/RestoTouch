import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './item.component';
import { CarouselModule, DropdownModule, AlertModule, TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import {ImageCropperComponent} from 'ng2-img-cropper/src/imageCropperComponent';


@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule, FormsModule, TooltipModule],
    declarations: [ItemComponent, ImageCropperComponent],
    exports: [ItemComponent]
})

export class ItemModule { }
