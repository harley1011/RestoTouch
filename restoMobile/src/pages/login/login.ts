import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {User} from '../../../../restoCommon/shared/models/user';
import {AuthService}       from '../services/auth.service';
import { Page1 } from '../page1/page1';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
    providers: [User, AuthService],
  templateUrl: 'login.html'
})
export class LoginPage {
  user = new User('', '', '', '', '');
  errorMessage = '';

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
              private authService: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit() {
    this.authService.authenticateUser(this.user)
      .subscribe(generalResponse =>
          this.navCtrl.push(Page1)
        , error => this.errorMessage = error);
  }
}
