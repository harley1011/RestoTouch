import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';
import {OrderService} from '../../services/order.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Order} from '../../shared/models/order';
import {Language} from './../../shared/models/language';
@Component({
  moduleId: module.id,
  selector: 'order-cmp',
  templateUrl: 'order.component.html'
})

export class OrderComponent implements OnInit {
  order: Order;

  @ViewChild(TranslationSelectComponent) translationSelectComponent: TranslationSelectComponent;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute) {

    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        orderService.retrieveCompletedOrder(params['id']).subscribe(order => {
          this.order = order.order;
          this.onSelectLanguage(this.translationSelectComponent.selectedLanguage);
        })
      }
    });
  }

  ngOnInit(): void {
  }

  onSelectLanguage(language: Language) {
    this.order.orderedItems.forEach(orderedItems => {
      orderedItems.item.selectedTranslation = orderedItems.item.translations.find(translation => translation.languageCode === language.languageCode);
    });
  }

}

