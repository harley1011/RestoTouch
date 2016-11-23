import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {DragulaModule} from 'ng2-dragula/ng2-dragula';

@NgModule({
  imports: [CommonModule, DragulaModule],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})

export class MenuModule {
}
