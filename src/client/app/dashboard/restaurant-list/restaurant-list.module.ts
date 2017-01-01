import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantListComponent } from './restaurant-list.component';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [CommonModule, TranslateModule],
    declarations: [RestaurantListComponent],
    exports: [RestaurantListComponent]
})

export class RestaurantListModule { }
