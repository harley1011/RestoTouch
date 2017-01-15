import {Component, OnInit} from '@angular/core';
import {User} from '../../../../../restoCommon/shared/models/user';
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

  constructor(private authService: AuthService,
              private router: Router,
              private translate: TranslateService) {
  }


  ngOnInit() {
    this.initLanguages();
  }

  onSubmit() {
    this.authService.authenticateUser(this.user)
      .subscribe(generalResponse =>
          this.router.navigate(['/dashboard/home'])
        , error => this.errorMessage = error);
  }

  initLanguages():void {
      this.translate.addLangs(['en', 'fr']);
      this.translate.setDefaultLang('en');
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

  }
}
