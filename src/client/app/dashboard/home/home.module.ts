import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule { }
