import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [CommonModule, TranslateModule],
    declarations: [SettingsComponent],
    exports: [SettingsComponent]
})

export class SettingsModule { }
