import { Component } from '@angular/core';

import { User } from '../shared/models/user';
import { AuthService }       from '../services/auth.service';
import { Router } from '@angular/router';

/**
*	This class represents the lazy loaded SignupComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'signup-cmp',
	templateUrl: 'signup.component.html',
  providers: [ AuthService ]
})

export class SignupComponent {
  user = new User('', '', '', '', '');
  errorMessage = '';

  constructor (private authService: AuthService,
               private router: Router,) {}

  onSubmit() {
     if (this.user.password !== this.user.passwordConfirm) {
       this.errorMessage = 'Passwords do not match';
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
