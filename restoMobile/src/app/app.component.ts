import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthService } from '../pages/services/auth.service';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RestaurantListPage } from '../pages/restaurant-list/restaurant-list';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('content') navController: NavController;

  rootPage: any = HomePage;
  startPage: any = LoginPage;
  restoListPage: any = RestaurantListPage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public authService: AuthService) {
    this.initializeApp();
    this.pages = [
      { title: 'Login', component: LoginPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.authService.setMainNavController(this.navController);
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
