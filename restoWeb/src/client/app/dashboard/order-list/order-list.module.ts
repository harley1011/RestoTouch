import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list.component';
import {TranslateModule} from 'ng2-translate';
import {TranslationSelectModule} from '../../shared/translation-select/translation-select.module';
import { DataTableModule } from "angular2-datatable";
import { FormsModule } from '@angular/forms';
import { DataFilterPipe }   from './data-filter.pipe';
import {DropdownModule} from 'ng2-bootstrap/dropdown';

@NgModule({
    imports: [CommonModule, TranslateModule, TranslationSelectModule, DataTableModule, FormsModule, DropdownModule.forRoot()],
    declarations: [OrderListComponent, DataFilterPipe],
    exports: [OrderListComponent]
})

export class OrderListModule { }
