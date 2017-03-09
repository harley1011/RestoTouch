import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {RestaurantService} from '../../services/restaurant.service';
import {Order} from '../../shared/models/order';
import {Language} from '../../shared/models/language';
import {Restaurant} from '../../shared/models/restaurant';
import {TranslateService} from 'ng2-translate';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';

import {Router} from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'order-list-cmp',
  templateUrl: 'order-list.component.html'
})

export class OrderListComponent implements OnInit {
  filterQuery = '';
  rowsOnPage = 10;
  sortBy = 'id';
  sortOrder = 'asc';
  orders: Order[];
  isEmployee: boolean;
  selectedSearchOption = 'Id';
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant;

  searchOptions = ['Id', 'Total', 'Paid Date'];

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;


  constructor(private translate: TranslateService,
              private orderService: OrderService,
              private router: Router,
              private restaurantService: RestaurantService) {
    translate.setDefaultLang('en');

  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      restaurants => {
        this.selectedRestaurant = restaurants[0];
        this.orderService.retrieveCompletedOrders(this.selectedRestaurant.id).subscribe(ordersResponse => {
          this.orders = ordersResponse.orders;
        });

        restaurants.forEach(restaurant => {
          restaurant.selectedTranslation = restaurant.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
        });
        this.restaurants = restaurants;
      },
      error => {
        console.log(error);
      }
    );
  }

  onChangeRestaurant(): void {
    this.orderService.retrieveCompletedOrders(this.selectedRestaurant.id).subscribe(ordersResponse => {
      this.orders = ordersResponse.orders;
    });

  }

  ngOnInit(): void {
    this.getRestaurants();
  }

  showOrderDetail(order: Order): void {
    this.router.navigate(['/dashboard/order', order.id]);
  }

  onSelectLanguage(language: Language) {
    this.restaurants.forEach(restaurant => {
      restaurant.selectedTranslation = restaurant.translations.find(translation => translation.languageCode === language.languageCode);
    });
  }

}
