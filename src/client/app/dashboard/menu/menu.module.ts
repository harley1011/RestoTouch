import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {CarouselModule, DropdownModule, AlertModule} from 'ng2-bootstrap/ng2-bootstrap';

import {BrowserModule} from '@angular/platform-browser';
import {DndModule} from 'ng2-dnd';
@NgModule({
  imports: [CommonModule, CarouselModule, DropdownModule, AlertModule, BrowserModule,
    DndModule.forRoot()],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})

export class MenuModule {
}
