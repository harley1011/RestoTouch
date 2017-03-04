import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import {KitchenComponent} from './kitchen.component';
@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [KitchenComponent],
  exports: [KitchenComponent]
})

export class KitchenModule {

}
