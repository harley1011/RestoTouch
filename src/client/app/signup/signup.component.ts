import { Component } from '@angular/core';

import { User } from './user';
import { UserService }       from './user.service';
import { Router } from '@angular/router';

/**
*	This class represents the lazy loaded SignupComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'signup-cmp',
	templateUrl: 'signup.component.html',
  providers: [ UserService ]
})

export class SignupComponent {
  user = new User('', '', '', '', '');
  errorMessage = '';

  constructor (private userService: UserService,
               private router: Router,) {}

  onSubmit() {
     if (this.user.password !== this.user.passwordConfirm) {
       this.errorMessage = 'Passwords do not match';
       return;
     }
     this.userService.registerUser(this.user)
                       .subscribe(
                         loginResponse => {
                           console.log(loginResponse);
                           this.router.navigate(['/dashboard/home']); },
                         error =>  this.errorMessage = <any>error);

  }

}
