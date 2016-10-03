import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { RestaurantListComponent } from './restaurantlist/restaurantlist.component';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule],
    declarations: [HomeComponent, RestaurantListComponent],
    exports: [HomeComponent, RestaurantListComponent]
})

export class HomeModule { }
