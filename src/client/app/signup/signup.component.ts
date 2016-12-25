import { Component } from '@angular/core';

import { User } from '../shared/models/user';
import { AuthService }       from '../services/auth.service';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate';

/**
*	This class represents the lazy loaded SignupComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'signup-cmp',
	templateUrl: 'signup.component.html'
})

export class SignupComponent {
  user = new User('', '', '', '', '');
  errorMessage = '';
  currentLanguage ='';

  constructor (private authService: AuthService,
               private router: Router,
               private translate: TranslateService,) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        this.currentLanguage = translate.currentLang;
        }

  onSubmit() {
     if (this.user.password !== this.user.passwordConfirm) {
       if(this.currentLanguage === 'en') {
       this.errorMessage = 'Passwords do not match';
       } else {
         this.errorMessage = 'Les mots de passe ne se concordent pas';
       }
       return;
     }
     this.authService.registerUser(this.user)
                       .subscribe(
                         loginResponse => {
                           console.log(loginResponse);
                           this.router.navigate(['/dashboard/home']); },
                         error =>  this.errorMessage = <any>error);

  }

}
