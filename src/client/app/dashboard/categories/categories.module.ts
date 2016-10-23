import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule],
    declarations: [CategoriesComponent],
    exports: [CategoriesComponent]
})

export class CategoriesModule { }
