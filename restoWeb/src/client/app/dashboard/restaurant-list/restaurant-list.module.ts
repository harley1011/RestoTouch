import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantListComponent } from './restaurant-list.component';
import {TranslateModule} from 'ng2-translate';
import {TranslationSelectModule} from '../../shared/translation-select/translation-select.module';
@NgModule({
    imports: [CommonModule, TranslateModule, TranslationSelectModule],
    declarations: [RestaurantListComponent],
    exports: [RestaurantListComponent]
})

export class RestaurantListModule { }
