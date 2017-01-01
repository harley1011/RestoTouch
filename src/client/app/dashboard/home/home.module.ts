import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [CommonModule, TranslateModule],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule { }
