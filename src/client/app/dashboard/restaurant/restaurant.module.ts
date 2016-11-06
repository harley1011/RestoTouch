import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantComponent } from './restaurant.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [RestaurantComponent],
    exports: [RestaurantComponent]
})

export class RestaurantModule { }
