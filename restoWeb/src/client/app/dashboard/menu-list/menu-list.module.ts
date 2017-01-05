import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list.component';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [CommonModule, TranslateModule],
    declarations: [MenuListComponent],
    exports: [MenuListComponent]
})

export class MenuListModule { }
