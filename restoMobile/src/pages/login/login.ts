import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../services/auth.service';
import {User} from '../shared/models/user';
import {RestaurantListPage} from '../restaurant-list/restaurant-list';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = new User('', '');
  errorMessage: string;

  constructor(public navCtrl: NavController,
              public authService: AuthService) {
  }

  onSubmit() {
    this.authService.authenticateUser(this.user)
      .subscribe(generalResponse =>
          this.navCtrl.push(RestaurantListPage)
        , error => this.errorMessage = error);
  }
}
