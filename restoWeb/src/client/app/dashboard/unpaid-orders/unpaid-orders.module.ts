import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnpaidOrdersComponent} from './unpaid-orders.component';
import {TranslateModule} from 'ng2-translate';
@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [UnpaidOrdersComponent],
  exports: [UnpaidOrdersComponent]
})

export class UnpaidOrdersModule {
}
