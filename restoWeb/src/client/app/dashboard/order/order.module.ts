import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './order.component';
import {ImageCropperComponent} from 'ng2-img-cropper/src/imageCropperComponent';
import {TranslateModule} from 'ng2-translate';
import {TranslationSelectModule} from '../../shared/index';


@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule, TranslationSelectModule],
    declarations: [OrderComponent],
    exports: [OrderComponent]
})

export class OrderModule { }
