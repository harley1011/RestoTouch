import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './account-settings.component';
import {TranslateModule} from 'ng2-translate';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, TranslateModule, FormsModule],
    declarations: [SettingsComponent],
    exports: [SettingsComponent]
})

export class SettingsModule { }
