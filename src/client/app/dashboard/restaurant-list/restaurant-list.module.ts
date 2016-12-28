import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { RestaurantListComponent } from './restaurant-list.component';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule, TranslateModule],
    declarations: [RestaurantListComponent],
    exports: [RestaurantListComponent]
})

export class RestaurantListModule { }
