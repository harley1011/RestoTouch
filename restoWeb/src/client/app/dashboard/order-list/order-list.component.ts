import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

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
  orders: Order[];
  isEmployee: boolean;


  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

  constructor(private router: Router,
              private translate: TranslateService,
              private authService: AuthService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
  }

  getRestaurants(): void {
  }

  onSelectLanguage(language: Language) {

  }

  ngOnInit(): void {
    this.getRestaurants();
    this.isEmployee = this.authService.loggedInUser.isEmployee;
  }
}
