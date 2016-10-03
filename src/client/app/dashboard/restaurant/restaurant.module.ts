import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule],
    declarations: [RestaurantComponent],
    exports: [RestaurantComponent]
})

export class RestaurantModule { }
