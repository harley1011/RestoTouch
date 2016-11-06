import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [MenuListComponent],
    exports: [MenuListComponent]
})

export class MenuListModule { }
