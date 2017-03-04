import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
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
              private route: ActivatedRoute,
              private router: Router ) {

    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        orderService.retrieveCompletedOrder(params['id']).subscribe(order => {
          let orderWithGroupedItems= new Order([],order.order.total, order.order.id);

          orderWithGroupedItems.total = order.order.total;

          order.order.orderedItems.forEach((orderedItem: any) => {

            let foundOrder = orderWithGroupedItems.orderedItems.find(correctOrderedItem => correctOrderedItem.item.id == orderedItem.item.id);

            if (!foundOrder) {
              orderedItem.sizes = [];
              orderWithGroupedItems.orderedItems.push(orderedItem);
              foundOrder = orderedItem;

            }
            foundOrder.sizes.push({size:orderedItem.size, selectedIngredients: null});
          })
          this.order = orderWithGroupedItems;
          this.onSelectLanguage(this.translationSelectComponent.selectedLanguage);
        })
      }
    });
  }

  ngOnInit(): void {
  }

  viewItem(id: number): void {
    this.router.navigate(['/dashboard/item', id]);
  }

  onSelectLanguage(language: Language) {
    this.order.orderedItems.forEach(orderedItem => {
      orderedItem.item.selectedTranslation = orderedItem.item.translations.find(translation => translation.languageCode === language.languageCode);
      orderedItem.sizes.forEach(container => { container.size.selectedTranslation = container.size.translations.find(translation => translation.languageCode === language.languageCode)});
    });
  }

}

