import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';

@Component({
  moduleId: module.id,
  selector: 'order-cmp',
  templateUrl: 'order.component.html'
})

export class OrderComponent implements OnInit {


  @ViewChild(TranslationSelectComponent) translationSelectComponent: TranslationSelectComponent;

}

