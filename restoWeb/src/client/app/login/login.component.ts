import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user';
import {AuthService}       from '../services/auth.service';
import {Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
/**
 *  This class represents the lazy loaded LoginComponent.
 */

@Component({
  moduleId: module.id,
  selector: 'login-cmp',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  user = new User('', '');
  errorMessage = '';
  isEmployee: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private translate: TranslateService) {
  }


  ngOnInit() {
    this.initLanguages();
    this.isEmployee = false;
  }

  onSubmit() {
    if(this.isEmployee) {
      this.authService.authenticateUser(this.user)
      .subscribe(generalResponse =>
          this.router.navigate(['/dashboard/unpaidOrders'])
        , error => this.errorMessage = error);
    }
    else {
      this.authService.authenticateUser(this.user)
      .subscribe(generalResponse =>
          this.router.navigate(['/dashboard/home'])
        , error => this.errorMessage = error);
    }
  }

  initLanguages():void {
      this.translate.addLangs(['en', 'fr']);
      this.translate.setDefaultLang('en');
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

  }
}
