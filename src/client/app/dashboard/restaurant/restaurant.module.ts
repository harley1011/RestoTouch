import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantComponent } from './restaurant.component';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule],
    declarations: [RestaurantComponent],
    exports: [RestaurantComponent]
})

export class RestaurantModule { }
