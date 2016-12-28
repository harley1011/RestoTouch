import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule, TranslateModule],
    declarations: [CategoryComponent],
    exports: [CategoryComponent]
})

export class CategoryModule { }
