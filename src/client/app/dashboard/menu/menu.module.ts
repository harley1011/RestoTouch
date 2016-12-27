import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule, FormsModule],
    declarations: [MenuComponent],
    exports: [MenuComponent]
})

export class MenuModule { }
