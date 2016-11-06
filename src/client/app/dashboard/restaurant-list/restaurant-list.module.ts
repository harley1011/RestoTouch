import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantListComponent } from './restaurant-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [RestaurantListComponent],
    exports: [RestaurantListComponent]
})

export class RestaurantListModule { }
