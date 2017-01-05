import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import {TranslateModule} from 'ng2-translate';
import {TranslationSelectModule} from '../../shared/index';
@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule, FormsModule, TranslateModule, TranslationSelectModule],
    declarations: [MenuComponent],
    exports: [MenuComponent]
})

export class MenuModule { }
