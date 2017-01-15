import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../services/auth.service';
import {User} from '../shared/models/user';
import {RestaurantListPage} from '../restaurant-list/restaurant-list';
import {TranslateService} from 'ng2-translate';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = new User('', '');
  errorMessage: string;

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              private translate: TranslateService) {
              // this language will be used as a fallback when a translation isn't found in the current language
              translate.setDefaultLang('en');
              //to set the current language
              translate.use('en');
  }

  onSubmit() {
    this.authService.authenticateUser(this.user)
      .subscribe(generalResponse =>
          this.navCtrl.push(RestaurantListPage)
        , error => this.errorMessage = error);
  }

  // toggle btwn french and english for app language
  switchLanguage(){
    if(this.translate.currentLang === 'en'){
      this.translate.use('fr');
    }
    else
      this.translate.use('en');
  }
}
