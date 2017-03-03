import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {Order} from '../../shared/models/order';
import {Language} from '../../shared/models/language';
import {TranslateService} from 'ng2-translate';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';
@Component({
  moduleId: module.id,
  selector: 'order-list-cmp',
  templateUrl: 'order-list.component.html'
})

export class OrderListComponent implements OnInit {
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "id";
  sortOrder = "asc";
  orders: Order[];
  isEmployee: boolean;

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

  constructor(private router: Router,
              private translate: TranslateService,
              private orderService: OrderService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    orderService.retrieveCompletedOrders().subscribe(ordersResponse => {
      console.log(ordersResponse);
      this.orders = ordersResponse.orders;
    });
  }

  getRestaurants(): void {
  }

  onSelectLanguage(language: Language) {

  }

  ngOnInit(): void {
    this.getRestaurants();
  }
}
