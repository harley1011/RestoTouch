import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import {KitchenCashierSelectComponent} from './kitchen-cashier-select.component';
@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [KitchenCashierSelectComponent],
  exports: [KitchenCashierSelectComponent]
})

export class KitchenCashierSelectModule {

}
