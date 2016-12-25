import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule, TranslateModule],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule { }
