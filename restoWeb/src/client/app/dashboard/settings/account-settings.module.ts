import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings.component';
import {TranslateModule} from 'ng2-translate';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, TranslateModule, FormsModule],
    declarations: [AccountSettingsComponent],
    exports: [AccountSettingsComponent]
})

export class SettingsModule { }
