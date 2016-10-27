import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { RestaurantListComponent } from './restaurant-list.component';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule],
    declarations: [RestaurantListComponent],
    exports: [RestaurantListComponent]
})

export class RestaurantListModule { }
