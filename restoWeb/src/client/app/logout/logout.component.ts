import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user';
import {AuthService}       from '../services/auth.service';
import {Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';

@Component({
  moduleId: module.id,
  selector: 'logout-cmp',
  templateUrl: 'logout.component.html'
})

export class LogoutComponent implements OnInit {
  user = new User('', '');
  errorMessage = '';

  constructor(private authService: AuthService,
              private router: Router,
              private translate: TranslateService,) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        }

    ngOnInit(): void {
        this.authService.logout();
        this.user.isEmployee = false;
    }

  onSubmit() {
    if(this.user.isEmployee) {
      this.user.employeePassword = this.user.password;
      this.authService.authenticateUser(this.user)
      .subscribe(generalResponse =>
          window.location.href = '/dashboard/restaurants'
        , error => this.errorMessage = error);
    } else {
      this.authService.authenticateUser(this.user)
      .subscribe(generalResponse =>
          window.location.href = '/dashboard/home'
        , error => this.errorMessage = error);
    }
  }
}
