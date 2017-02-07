import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnpaidOrdersComponent} from './unpaid-orders.component';
@NgModule({
  imports: [CommonModule],
  declarations: [UnpaidOrdersComponent],
  exports: [UnpaidOrdersComponent]
})

export class UnpaidOrdersModule {
}
