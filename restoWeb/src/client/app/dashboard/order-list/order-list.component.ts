import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {RestaurantService} from '../../services/restaurant.service';
import {Order} from '../../shared/models/order';
import {Language} from '../../shared/models/language';
import {TranslateService} from 'ng2-translate';


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
  selectedSearchOption = 'Id';

  searchOptions = ['Id', 'Total', 'Paid Date']

  constructor(private translate: TranslateService,
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

  onSelectLanguage(searchOption: string) {
    console.log(searchOption);
  }

  ngOnInit(): void {
    this.getRestaurants();
  }
}
